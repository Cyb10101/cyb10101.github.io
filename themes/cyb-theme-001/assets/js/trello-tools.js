class TrelloTools {
    constructor() {
        this.key = '';
        this.token = '';
        this.boardSelect = document.querySelector('select[name=board]');
        this.output = document.getElementById('output');
        this.toolbarButtonsEnabled(false);

        if (localStorage.getItem('key') && localStorage.getItem('key') !== '') {
            this.key = localStorage.getItem('key');
            this.log('Key found.');
        }
        if (localStorage.getItem('token') && localStorage.getItem('token') !== '') {
            this.token = localStorage.getItem('token');
            this.log('Token found.');
        }

        if (document.querySelector('.js-trello-tools')) {
            this.initialize();
        }
    }

    initialize() {
        let instance = this;

        if (this.key !== '' && this.token !== '') {
            this.loadBoards();
        } else {
            this.log('Waiting on input in the form above...');
        }

        document.getElementById('key').addEventListener('change', (event) => {
            instance.key = event.target.value.trim();
            localStorage.setItem('key', instance.key);
            if (instance.key !== '' && instance.token !== '') {
                instance.loadBoards();
            }
        });

        document.getElementById('token').addEventListener('change', (event) => {
            instance.token = event.target.value.trim();
            // console.log('token', event.target.value.trim());
            localStorage.setItem('token', instance.token);
            if (instance.key !== '' && instance.token !== '') {
                instance.loadBoards();
            }
        });

        document.getElementById('initialize').addEventListener('click', (event) => {
            this.output.innerHTML = '';
            instance.loadBoards();
        });

        document.getElementById('listArchived').addEventListener('click', (event) => {
            let instance = this;
            this.output.innerHTML = '';
            if (instance.getBoardId() !== '') {
                instance.log('Board: ' + instance.getBoardName());

                instance.log('Getting all archived cards on board: ' + instance.getBoardId());
                instance.getApi('1/boards/' + instance.getBoardId() + '/cards/closed', cards => {
                    // instance.logCards(cards);
                    instance.createTableByCards(cards);
                });
            } else {
                instance.log('Error: Board missing!');
            }
        });

        document.getElementById('removeArchived').addEventListener('click', (event) => {
            this.output.innerHTML = '';
            if (instance.getBoardId() !== '') {
                instance.log('Board: ' + instance.getBoardName());

                instance.log('Getting all archived cards on board: ' + instance.getBoardId());
                instance.getApi('1/boards/' + instance.getBoardId() + '/cards/closed', cards => {
                    instance.log(cards.length + ' cards founds!');
                    if(cards.length && confirm('Are you sure you want to delete ' + cards.length + ' cards permanently?')) {
                        instance.removeCards(cards);
                    } else {
                        instance.log('No cards deleted.') ;
                    }
                });
            } else {
                instance.log('Error: Board missing!');
            }
        });
    }

    toolbarButtonsEnabled(enabled) {
        document.querySelectorAll('#listArchived, #removeArchived').forEach(button => {
            if (enabled) {
                button.classList.add('btn-primary');
                button.classList.remove('disabled', 'btn-secondary');
            } else {
                button.classList.remove('btn-primary');
                button.classList.add('disabled', 'btn-secondary');
            }
        });

        let buttonInitialize = document.querySelector('#initialize');
        if (enabled) {
            buttonInitialize.classList.add('btn-secondary');
            buttonInitialize.classList.remove('disabled', 'btn-primary');
        } else {
            buttonInitialize.classList.remove('disabled', 'btn-secondary');
            buttonInitialize.classList.add('btn-primary');
        }
    }

    loadBoards() {
        let instance = this;
        this.log('Getting all boards...');
        this.getApi('1/members/me/boards', boards => {
            for (let i = 0; i < boards.length; i++) {
                let board = boards[i];

                let option = document.createElement('option');
                option.value = board.shortLink;
                option.innerHTML = board.name;
                instance.boardSelect.appendChild(option);
            }

            this.toolbarButtonsEnabled(true);
            instance.log('Initialized.');
        });
    }

    getBoardId() {
        return this.boardSelect.value;
    }

    getBoardName() {
        return this.boardSelect.querySelector('option[value="' + this.getBoardId() + '"]').innerText;
    }

    logCards(cards) {
        let cardNames = [];
        for (let i = 0; i < cards.length; i++) {
            let card = cards[i];
            cardNames.push('<li>' + card.name + '</li>');
        }
        this.log('<ul>' + cardNames.join('') + '</ul>');

        this.log(cards.length + ' cards founds!');
    }

    async removeCards(cards) {
        let i = 0;
        for (const card of cards) {
            i++;
            this.log('# ' + i + ' of ' + cards.length + ' - Deleting card: ' + card.name);
            let deleteResponse = await fetch(this.getApiUrl('1/cards/' + card.id), {method: 'DELETE'});
        }
        this.log('Batch deleting complete!')
    }

    removeCard(cardId) {
        return fetch(this.getApiUrl('1/cards/' + cardId), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        });
    }

    getApiUrl(path) {
        return 'https://api.trello.com/' + path + '?key=' + this.key + '&token=' + this.token;
    }

    getApi(path, callback) {
        fetch(this.getApiUrl(path), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(result => result.json()).then(object => {
            callback(object);
        });
    }

    log(msg) {
        let statusEl = document.getElementById('status')
        statusEl.innerHTML = msg + '\n' + statusEl.innerHTML
    }

    formatDateYmd(date) {
        let year = date.getFullYear();
        let month = '0' + (date.getMonth() + 1);
        let day = '0' + date.getDate();
        return year + '-' + month.slice(-2) + '-' + day.slice(-2);
    }


    createTableByCards(cards) {
        let instance = this;
        let toolbar = '<button class="btn btn-danger btn-sm js-remove"><i class="fas fa-trash"></i> Remove</button>';

        let table = '';
        table = '<table class="table table-striped"><thead><tr>' +
            '<th><input type="checkbox" class="js-list-all"></th>' +
            '<th>Name</th>' +
            '<th>Last activity</th>' +
            '</tr></thead><tbody>';

        for (let i = 0; i < cards.length; i++) {
            let card = cards[i];
            let date = new Date(card.dateLastActivity);
            table += '<tr>' +
                '<td><input type="checkbox" value="' + card.id + '"></td>' +
                '<td><a href="' + card.url + '" target="_blank">' + card.name + '</a></td>' +
                '<td>' + instance.formatDateYmd(date) + '</td>' +
                '</tr>';
        }

        table += '</tbody></table>';

        let div = document.createElement('div');
        div.classList.add('list');
        div.innerHTML = toolbar + table;

        // Bind multi checker
        div.querySelector('.js-list-all').addEventListener('click', (event) => {
            let isChecked = event.target.checked;
            let inputs = div.querySelectorAll('tbody td input');
            if (inputs.length > 0) {
                inputs.forEach(input => {
                    input.checked = isChecked;
                });
            }
        });

        // Bind toolbar
        div.querySelector('.js-remove').addEventListener('click', (event) => {
            let inputs = div.querySelectorAll('tbody td input:checked');
            if (inputs.length > 0) {
                inputs.forEach(input => {
                    let cardId = input.value;
                    instance.removeCard(cardId).then((data) => {
                        input.parentElement.parentElement.remove();
                    }).catch((error) => {
                        instance.log('Error delete card: ' + cardId);
                        console.error('Error:', error);
                    });
                });
            }
        });

        this.output.innerHTML = '';
        this.output.append(div);
    }
}

module.exports = {TrelloTools};
