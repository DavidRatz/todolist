export interface Todo{
    id: number;
    name: string;
    description?: string | null;
    dateCreate: Date;
    deadLine?: Date | null;
    dateEnd?: Date | null;
    priority: 'low'|'medium'|'high';
}