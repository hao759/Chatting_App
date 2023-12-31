import { Photo } from "./Photo"


export interface Member {
    id: number
    name: string
    // name2: any
    photoUrl: string;
    age: number
    knownAs: string
    created: string
    lastActive: string
    gender: string
    introduction: string
    lookingFor: string
    interests: string
    city: string
    country: string
    photos: Photo[];
}