import * as vscode from "vscode";
import { TagData } from "../media/editor/tagData";

export class TagsHandler {
    private tagFileName: vscode.Uri;
    public static async create(tagFileName: vscode.Uri): Promise<TagsHandler> {
        try { 
            await vscode.workspace.fs.readFile(tagFileName);
        } catch (any) {
            await vscode.workspace.fs.writeFile(tagFileName, Buffer.from("[]", "utf-8"));
        }
        return new TagsHandler(tagFileName);
    }
    constructor(tagFileName: vscode.Uri) {
        this.tagFileName = tagFileName;
    }
    public async retrieveTags(): Promise<TagData[]> {
        return JSON.parse((await vscode.workspace.fs.readFile(this.tagFileName)).toString());
    }

    public async saveTags(tags: TagData[]): Promise<void> {
        await vscode.workspace.fs.writeFile(this.tagFileName, Buffer.from(JSON.stringify(tags), "utf-8"));
    }
}