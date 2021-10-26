# Hex Editor with Tags

## This is a mod of the [Hex Editor](https://marketplace.visualstudio.com/items?itemName=ms-vscode.hexeditor) extension for reverse engineering and analyzing binary files with added **tag/annotation** support.

# Added functionality:
- ## Add Tag command
Adds a tag at selection, provides an option to select **color** and **caption** for the tag.
- ## Go To Tag command
Allows to select a tag from the list and jumps to its position.
- ## Remove Tag command
Allows to select a tag from the list and removes it from the file.
- ## Remove Tag At Selection command
If the selected byte is annotated by a tag, removes the tag.
- ## Remove All Tags commands
Removes all tags from the file.
- ## Offset and Tag fields in Data Inspector
This mod adds two more fields to the Data Inspector: Offset shows the offset of the selected byte, and Tag shows the caption of the tag, in which the selected byte is located, or "None" if the selected byte is not located inside any tag.

<hr>

![Data Inspector with added fields](/assets/img/data_inspector.png)

<hr>

- ## Colorful tags
The mod allows to select a color for each tag for better visualization.

<hr>

![Hex Editor with Tags](/assets/img/hex_editor.png)

<hr>