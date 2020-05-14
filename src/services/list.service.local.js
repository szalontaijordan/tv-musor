import { ListService } from "./list.service";

const mockList = {
    id: 'mock-id',
    list: [
        { id: 0, label: 'mock item 1'},
        { id: 1, label: 'mock item 2'},
        { id: 2, label: 'mock item 3'},
        { id: 3, label: 'mock item 4'},
        { id: 4, label: 'mock item 5'},
    ],
    title: 'Mock list 1',
    date: new Date()
};

const mockActive = {
    id: 'mock-id',
    date: new Date(),
    title: 'Test list',
    list: [
        { id: 0, label: 'Test 1'},
        { id: 1, label: 'Test 2'},
        { id: 2, label: 'Test 3'},
        { id: 3, label: 'Test 4'},
    ]
};

export class ListServiceLocal extends ListService {

    lists = [
        mockList
    ];

    activeShoppings = [
        // mockActive
    ]

    constructor(...props) {
        super(props);
    }

    async fetchLists() {
        await this._delay();
        return this.lists;;
    }

    async fetchList(id) {
        await this._delay();
        console.log(this.lists, id);
        const list = this.lists.find(x => x.id === id);
        if (list) {
            return list;
        }
        throw new Error('List not found');
    }

    async createList(list) {
        console.log('[SERVICE] Create', list);
        await this._delay();
        this.lists = this.lists.filter(x => x.id !== list.id);
        this.lists.unshift(list);
        return list;
    }

    async deleteList(list) {
        await this._delay();
        return this.lists.filter(x => x.id !== list.id);
    }

    async fetchActiveShoppings() {
        await this._delay();
        return this.activeShoppings;
    }

    async createActiveShopping(list) {
        await this._delay();
        const index = this.activeShoppings.find(x => x.id === list.id);
        if (index >= 0) {
            this.activeShoppings.splice(index, 0);
        }
        this.activeShoppings.unshift(list);
        return list;
    }

    _delay() {
        return new Promise(resolve => setTimeout(resolve, 400));
    }
}
