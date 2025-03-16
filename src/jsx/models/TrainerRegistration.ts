export interface TrainerRegistration {
    trainerId: number | null;            // int? -> optional number
    name: string;                  // string (non-null in C#, so required here)
    email: string;                 // string (non-null in C#, so required here)
    location?: string;             // string? -> optional string
    experience: number;            // int (non-null in C#, so required here)
    specialisation?: string;       // string? -> optional string
    topTrainingAreas?: string;     // string? -> optional string
    pricePerSession: number;       // decimal (non-null in C#, so required number)
    hoursPerSession: number;       // int (non-null in C#, so required number)
    profileImage: string | null;
}
