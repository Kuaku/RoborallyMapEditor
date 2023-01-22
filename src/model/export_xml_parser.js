class ExportXMLParser {
    constructor() {
        this.text = "";
        this.indent = "";
        this.tag_history = [];
    }

    increase_indent() {
        this.indent += `\t`;
    }

    decrease_indent() {
        this.indent = this.indent.slice(0, this.indent.length-1);
    }

    open_tag(tag_name) {
        this.tag_history.push(tag_name);
        this.text += `${this.indent}<${tag_name}>\n`;
        this.increase_indent();
    }

    close_tag() {
        this.decrease_indent()
        this.text += `${this.indent}</${this.tag_history.pop()}>\n`
    }

    inline_tag(tag_name, inner) {
        this.text += `${this.indent}<${tag_name}>${inner}</${tag_name}>\n`
    }

    get_text() {
        return this.text;
    }
}

export { ExportXMLParser }