export declare class StorageService {
    private static isMongoConnected;
    static setMongoConnected(status: boolean): void;
    static saveSubmission(data: any): Promise<any>;
    static getAllSubmissions(): Promise<any[]>;
    private static saveToFile;
    private static readFromFile;
}
//# sourceMappingURL=StorageService.d.ts.map