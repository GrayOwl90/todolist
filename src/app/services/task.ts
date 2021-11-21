export class Task{
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public importance: 'usual' | 'important' | 'veryImportant',
        public completed: boolean,
        public createdDate: number | Date,
        public deadlineDate?: string,
        public completedDate?: string) { }
}