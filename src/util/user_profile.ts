import { faker } from "@faker-js/faker";
import { CodeToColor as codeToColor, Color, HSVtoRGB } from "./util";
import { DocumentSnapshot, SnapshotOptions, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";


interface UserProfileData {
    id: string,
    alias: string,
    firstname: string,
    surname: string,
    job_title: string,
    email: string,
    location: string,
    company?: string,
    phone?: string,
    about?: string,
    website?: string,
    card_foreground?: Color,
    card_secondary?: Color,
    card_background?: Color,
}

export class UserProfile {
    data: UserProfileData;
    docname: string;

    public constructor(data: UserProfileData, docname: string) {
        this.data = data;
        this.docname = docname;
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

        if (this.data.website.startsWith("http://") && this.data.website.startsWith("https://")) {
            return "https://" + this.data.website;
        }
        return this.data.website;
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
            id: "fake_" + id,
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
        }, "fake_" + id)
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
            id: data.id,
            alias: data.alias,
            firstname: data.firstname,
            surname: data.surname,
            job_title: data.job_title,
            email: data.email,
            location: data.location,
            company: ne(data.company),
            phone: ne(data.phone),
            about: ne(data.about),
            website: ne(data.website),
            card_foreground: codeToColor(ne(data.card_foreground)),
            card_secondary: codeToColor(ne(data.card_secondary)),
            card_background: codeToColor(ne(data.card_background)),
        }, snapshot.id);
        return t;
    }
}

export async function getUserProfile(user_id: string): Promise<UserProfile | undefined> {
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
