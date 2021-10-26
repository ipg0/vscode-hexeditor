// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { DataInspectorView } from "./dataInspectorView";
import { HexEditorProvider } from "./hexEditorProvider";
import { openOffsetInput } from "./util";

export function activate(context: vscode.ExtensionContext): void {
	// Register the data inspector as a separate view on the side
	const dataInspectorProvider = new DataInspectorView(context.extensionUri);
	context.subscriptions.push(vscode.window.registerWebviewViewProvider(DataInspectorView.viewType, dataInspectorProvider));
	const openWithCommand = vscode.commands.registerTextEditorCommand("hexEditor.openFile", (textEditor: vscode.TextEditor) => {
		vscode.commands.executeCommand("vscode.openWith", textEditor.document.uri, "hexEditor.hexedit");
	});
	const goToOffsetCommand = vscode.commands.registerCommand("hexEditor.goToOffset", async () => {
		const offset = await openOffsetInput();
		// Notify the current webview that the user wants to go to a specific offset
		if (offset && HexEditorProvider.currentWebview) {
			HexEditorProvider.currentWebview.postMessage({ type: "goToOffset", body: { offset } });
		}
	});

	const goToTagCommand = vscode.commands.registerCommand("hexEditor.goToTag", async () => {
		const caption = await vscode.window.showQuickPick(HexEditorProvider.globalTags.map(tag => tag.caption),
			{ placeHolder: "Select a tag" });
		if (caption && HexEditorProvider.currentWebview) {
			HexEditorProvider.currentWebview.postMessage({ type: "goToTag", body: { caption } });
		}
	});

	const addTagCommand = vscode.commands.registerCommand("hexEditor.addTag", async () => {
		const caption = await vscode.window.showInputBox({ placeHolder: "Caption" });
		let color = await vscode.window.showQuickPick([
			"red",
			"orange",
			"yellow",
			"lime",
			"green",
			"aqua",
			"blue",
			"purple",
			"pink",
			"Custom CSS color"
		], { canPickMany: false, placeHolder: "Pick a color" });
		if(color == "Custom CSS color") {
			color = await vscode.window.showInputBox({ placeHolder: "CSS Color" });
		}
		if(HexEditorProvider.currentWebview) {
			HexEditorProvider.currentWebview.postMessage({ type: "addTag", body: { color: color, caption: caption } });
		}
	});

	const removeTagAtSelectionCommand = vscode.commands.registerCommand("hexEditor.removeTagAtSelection", async () => {
		if (HexEditorProvider.currentWebview) {
			HexEditorProvider.currentWebview.postMessage({ type: "removeTagAtSelection" });
		}
	});
	const removeTagCommand = vscode.commands.registerCommand("hexEditor.removeTag", async () => {
		const caption = await vscode.window.showQuickPick(HexEditorProvider.globalTags.map(tag => tag.caption),
			{ placeHolder: "Select a tag" });
		if (HexEditorProvider.currentWebview) {
			HexEditorProvider.currentWebview.postMessage({ type: "removeTag", body: { caption: caption } });
		}
	});
	const removeAllTagsCommand = vscode.commands.registerCommand("hexEditor.removeAllTags", async () => {
		if (HexEditorProvider.currentWebview) {
			HexEditorProvider.currentWebview.postMessage({ type: "removeAllTags", body: {} });
		}
	});

	context.subscriptions.push(goToOffsetCommand);
	context.subscriptions.push(openWithCommand);
	context.subscriptions.push(addTagCommand);
	context.subscriptions.push(goToTagCommand);
	context.subscriptions.push(removeTagAtSelectionCommand);
	context.subscriptions.push(removeTagCommand);
	context.subscriptions.push(removeAllTagsCommand);
	context.subscriptions.push(HexEditorProvider.register(context, dataInspectorProvider));
}