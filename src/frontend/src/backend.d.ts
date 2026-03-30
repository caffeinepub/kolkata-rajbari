import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Reservation {
    id: bigint;
    date: string;
    specialRequests: string;
    time: string;
    submittedAt: Time;
    guestName: string;
    numberOfGuests: bigint;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export interface SubmitReservationRequest {
    date: string;
    specialRequests: string;
    time: string;
    guestName: string;
    numberOfGuests: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    debugGetIsAdmin(): Promise<boolean>;
    getAllReservations(): Promise<Array<Reservation>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitReservation(request: SubmitReservationRequest): Promise<bigint>;
}
