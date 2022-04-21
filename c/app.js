class Todo {
    constructor(name) {
        this.name = name;
    }
};


Vue.createApp({
    data() {
        return {
            // test: "Hi i'm VUE!",
            value: "",
            todos: [],
            err: null
        }
    },

    methods: {
        addTodo() {
            if (this.value.length < 3) {
                this.err = "Меньше 3х символов"

                setTimeout(() => {
                    this.err = null
                }, 2000)
            }
            else {
                const todo = new Todo(this.value)
                console.log(todo)
                fetch("http://localhost:1112/create", {
                    method: "POST",
                    body: JSON.stringify(todo),
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then(response => response.json())
                .then(data => {
                    this.todos = data;
                    this.value = ""
                })
            }
        },

        check(id) {
            fetch("http://localhost:1112/todos", {
                method: "PUT",
                body: JSON.stringify({
                    id: id
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
        },

        del(id) {
            fetch("http://localhost:1112/todos", {
                method: "DELETE",
                body: JSON.stringify({
                    id: id
                }),
                headers: {
                    "Content-type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
        }
    },

    updated() {
        fetch("http://localhost:1112/todos")
        .then(response => response.json())
        .then(data => this.todos = data)
    },
    mounted() {
        fetch("http://localhost:1112/todos")
        .then(response => response.json())
        .then(data => this.todos = data)
    }
}).mount("#vue")