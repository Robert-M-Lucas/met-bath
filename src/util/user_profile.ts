import { faker } from "@faker-js/faker";
import { CodeToColor, Color, ColorToCode, HSVtoRGB, IS_DEV } from "./util";
import { DocumentSnapshot, SnapshotOptions, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "./firebase";


interface UserProfileData {
    alias: string,
    firstname: string,
    middle_names?: string,
    surname: string,
    job_title: string,
    email?: string,
    location: string,
    company?: string,
    phone?: string,
    about?: string,
    website?: string,
    card_foreground: Color,
    card_secondary: Color,
    card_background: Color,
}

export class UserProfile {
    data: UserProfileData;
    docname: string;

    public constructor(data: UserProfileData, docname: string) {
        this.data = data;
        this.docname = docname;
    }

    public static empty(): UserProfile {
        return new UserProfile({
            alias: "",
            firstname: "",
            surname: "",
            job_title: "",
            location: "",
            card_foreground: this.defaultForeground(),
            card_secondary: this.defaultSecondary(),
            card_background: this.defaultBackground(),
        }, "sample");
    }

    public simpleUrl() {
        if (!this.data.website) {
            return undefined;
        }
        
        function remove_trailing_slash(url: string) {
            if (url.endsWith("/")) {
                return url.substring(0, url.length - 1);
            }
            return url;
        }

        if (this.data.website.startsWith("http://")) {
            return remove_trailing_slash(this.data.website.substring(7, this.data.website.length));
        }
        if (this.data.website.startsWith("https://")) {
            return remove_trailing_slash(this.data.website.substring(8, this.data.website.length));
        }
        return this.data.website;
    }

    public fullUrl() {
        if (!this.data.website) {
            return undefined;
        }

        if (!(this.data.website.startsWith("http://") && this.data.website.startsWith("https://"))) {
            return "https://" + this.data.website;
        }
        return this.data.website;
    }

    public static defaultForeground(): Color {
        return {r: 0, g: 0, b: 0};
    }

    public static defaultSecondary(): Color {
        return {r: 128, g: 128, b: 128};
    }

    public static defaultBackground(): Color {
        return {r: 255, g: 255, b: 255};
    }

    static fakeFromId(id: number, sex?: "male" | "female"): UserProfile {
        faker.seed(id);

        const firstname = faker.person.firstName(sex);
        const lastname = faker.person.lastName();

        const hue = faker.number.float({min: 0, max: 1});
        const foreground = HSVtoRGB(hue, 0.75, 0.75);
        const secondary_sat = faker.number.int({min: 0, max: 1}) == 0 ? 0 : 0.5;
        const secondary = HSVtoRGB(hue, secondary_sat, secondary_sat);

        return new UserProfile({
            alias: "fake_alias",
            firstname: firstname,
            surname: lastname,
            job_title: faker.person.jobTitle(),
            email: faker.internet.email({
                firstName: firstname,
                lastName: lastname
            }).toLowerCase(),
            company: faker.company.name(),
            location: faker.location.city() + ", " + faker.location.country(),
            phone: faker.phone.number(),
            about: [...Array(faker.number.int({min: 4, max: 9}))].map(() => faker.lorem.sentences(faker.number.int({min: 4, max: 9}))).join("\n\n"),
            website: faker.internet.url(),
            card_foreground: foreground,
            card_secondary: secondary,
            card_background: this.defaultBackground(),
        }, "sample")
    }

    static fromFirestore(snapshot: DocumentSnapshot, options: SnapshotOptions): UserProfile | undefined {
        const data = snapshot.data(options);
        if (!data) {
            return undefined;
        }

        const ne = (s: string): string | undefined => {
            if (s === "") {
                return undefined;
            }
            return s;
        }

        const t = new UserProfile({
            alias: data.alias,
            firstname: data.firstname,
            middle_names: ne(data.middle_names),
            surname: data.surname,
            job_title: data.job_title,
            email: data.email,
            location: data.location,
            company: ne(data.company),
            phone: ne(data.phone),
            about: ne(data.about),
            website: ne(data.website),
            card_foreground: CodeToColor(data.card_foreground)!,
            card_secondary: CodeToColor(data.card_secondary)!,
            card_background: CodeToColor(data.card_background)!,
        }, snapshot.id);
        return t;
    }

    toSendObject(): object {
        return {
            alias: this.data.alias,
            firstname: this.data.firstname,
            middle_names: this.data.middle_names ?? "",
            surname: this.data.surname,
            job_title: this.data.job_title,
            email: this.data.email ?? "",
            location: this.data.location ?? "",
            company: this.data.company ?? "",
            phone: this.data.phone ?? "",
            about: this.data.about ?? "",
            website: this.data.website ?? "",
            card_foreground: ColorToCode(this.data.card_foreground),
            card_secondary: ColorToCode(this.data.card_secondary),
            card_background: ColorToCode(this.data.card_background),
        };
    }
}

export async function getUserProfile(user_id: string): Promise<UserProfile | undefined> {
    if (IS_DEV) { console.log("getUserProfile: " + user_id); }
    const docRef = doc(collection(db, "UserProfiles"), user_id);
    
    let up: UserProfile | undefined = undefined;
    await getDoc(docRef).then((ds) =>
        {
            up = UserProfile.fromFirestore(ds, {});
        }
    );

    return up;
}

export async function getUserProfileByAlias(user_alias: string): Promise<UserProfile | undefined> {
    if (IS_DEV) { console.log("getUserProfileByAlias: " + user_alias); }
    const q = query(collection(db, "UserProfiles"), where("alias", "==", user_alias));

    let up: UserProfile | undefined = undefined;

    await getDocs(q).then((qs) => {
            if (qs.docs.length !== 0) {
                up = UserProfile.fromFirestore(qs.docs[0], {});
            }
        }
    );
    return up;
}

export async function setUserProfileF(user_id: string, user_profile: UserProfile) {
    if (IS_DEV) { console.log("setUserProfileF: " + user_id); }
    const obj = user_profile.toSendObject();
    await setDoc(
        doc(collection(db, "UserProfiles"), user_id), 
        obj
    );
}

export async function isUserAConnection(user_id: string, other_id: string): Promise<boolean> {
    if (IS_DEV) { console.log("isUserAConnection: " + user_id + " [user_id] | " + other_id + " [other_id]"); }
    const docRef = doc(collection(db, "UserProfiles", user_id, "Connections"), other_id);
    let found = false;
    await getDoc(docRef).then((x) => {
        found = x.exists();
    }).catch(() => { found = false });
    return found;
}

export async function addUserConnection(user_id: string, other_id: string): Promise<void> {
    if (IS_DEV) { console.log("addUserConnection: " + user_id + " [user_id] | " + other_id + " [other_id]"); }
    const docRef = doc(collection(db, "UserProfiles", user_id, "Connections"), other_id);
    await setDoc(docRef, {});
}

export async function removeUserConnection(user_id: string, other_id: string): Promise<void> {
    if (IS_DEV) { console.log("removeUserConnection: " + user_id + " [user_id] | " + other_id + " [other_id]"); }
    const docRef = doc(collection(db, "UserProfiles", user_id, "Connections"), other_id);
    await deleteDoc(docRef);
}

export async function getAllUserConnections(user_id: string): Promise<string[]> {
    if (IS_DEV) { console.log("getAllUserConnections: " + user_id); }
    const q = query(collection(db, "UserProfiles", user_id, "Connections"));

    let found: string[] = [];
    await getDocs(q).then((qs) => {
            found = qs.docs.map((d) => d.id);
        }
    );
    return found;
}