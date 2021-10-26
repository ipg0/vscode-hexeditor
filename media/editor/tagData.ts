export class TagData {
    public from: number;
    public to: number;
    public color: string;
    public caption: string;
    constructor(from: number, to: number, color: string, caption: string) {
        this.from = from;
        this.to = to;
        this.color = color;
        this.caption = caption;
    }
}