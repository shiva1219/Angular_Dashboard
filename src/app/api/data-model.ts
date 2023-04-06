export class Profile {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}
export class UserVerification {
    email: string;
    code: string;
    new_password: string;
}
export class forgotPassword {
    email: string;
}
export class sessionToken {
    email: string;
    password: string;
    duration: 0;
}
export class Country {
    CountryCode: string;
    CountryName: string;
}
export class userProfile {
    isValid: boolean;
    userName: string;
}
export class Regions {
    regionId: string;
    regionName: string;
}
export const PROFILES: Profile[] = [];

export const COUNTRIES: Country[] = [
    {
        CountryCode: "+91",
        CountryName: "India(+91)"
    },
    {
        CountryCode: "+61",
        CountryName: "Australia(+61)"
    },
    {
        CountryCode: "+44",
        CountryName: "United states(+44)"
    }
]

export class LoginResponse {
    session_token: string;
    id: string;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    is_sys_admin: string;
    last_login_date: string;
    host: string;
}