export enum MessageType {
    Success = 'Success',
    Error = 'Error',
    Warning = 'Warning'
}

export interface ApiResponse {
    Message: string;
    MessageType: MessageType;
    UserId : Number;
}