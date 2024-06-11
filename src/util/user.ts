import { faker, ur } from "@faker-js/faker";

export type Color = {r: number, g: number, b: number};

interface UserProfileData {
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
    data: UserProfileData

    public constructor(data: UserProfileData) {
        this.data = data;
    }

    public simple_url() {
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

    public full_url() {
        if (!this.data.website) {
            return undefined;
        }

        if (this.data.website.startsWith("http://") && this.data.website.startsWith("https://")) {
            return "https://" + this.data.website;
        }
        return this.data.website;
    }

    static fake_from_id(id: number, sex?: string): UserProfile {
        faker.seed(id);

        const firstname = faker.person.firstName(sex);
        const lastname = faker.person.lastName();

        const hue = faker.number.float({min: 0, max: 1});
        const foreground = HSVtoRGB(hue, 0.75, 0.75);
        console.log(foreground);
        const secondary_sat = faker.number.int({min: 0, max: 1}) == 0 ? 0 : 0.5;
        const secondary = HSVtoRGB(hue, secondary_sat, secondary_sat);

        return new UserProfile({
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
        })
    }
}

function HSVtoRGB(h: number, s: number, v: number): Color {
    let r, g, b;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r! * 255),
        g: Math.round(g! * 255),
        b: Math.round(b! * 255)
    };
}