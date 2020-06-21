import React from "react";
import "./styles/app.css";
import { Input } from "./Input";
import { List } from "./List";
import { itemStore } from "../stores/ItemStore";
export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: false
        };
        this.loadItemsFromServer().catch((e) => console.error(e));
    }

    async onRemove(id) {
        if (confirm("Are you sure you want to delete this item?")) {
            await itemStore.delete(id);
            await this.loadItemsFromServer();
        }
    }

    async onUpdate(id, txt) {
        await itemStore.update(id, { name: txt });
        await this.loadItemsFromServer();
    }

    async addItem(txt) {
        await itemStore.create({ name: txt });
        await this.loadItemsFromServer();
    }

    render() {
        return (
            <>
                <Input
                    onAdd={(txt) => {
                        this.addItem(txt);
                    }}
                    placeholder={"Add an item"}
                />
                <List
                    onRemove={this.onRemove.bind(this)}
                    onUpdate={this.onUpdate.bind(this)}
                    items={this.state.items}
                    loading={this.state.loading}
                />
            </>
        );
    }

    async loadItemsFromServer() {
        let items = await itemStore.read();
        this.setState({
            items,
        });
    }
}
