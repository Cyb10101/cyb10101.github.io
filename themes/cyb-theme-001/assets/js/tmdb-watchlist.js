import {Modal} from 'bootstrap';
import {Task} from './task.js';

const task = new Task();


class TmdbWatchlist {
    constructor() {
        this.netslumCacheDirectUrl = 'https://cache.netslum.de/?type=direct&url=';
        this.config = {
            apiKeyV4: '', // API token for read access (v4 auth)
            requestToken: '', // Temporary
            accessToken: '', // Elevated API token
            accountId: '', // API Account

            website: 'https://themoviedb.org/',
            imageUrl: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2',
            providerTop: [
                8, // Netflix
                175, // Netflix Kids
                9, // Amazon Prime
                533, // Amazon Arthaus Channel
                337, // Disney Plus
            ],
        };
        this.providerProgress = {
            current: 0,
            total: 0,
        }
    }

    initialize() {
        this.toolbarButtonsEnabled(false);
        this.moviesContainer = document.getElementById('movies');
        this.progressBar = document.getElementById('progress');
        this.status = document.getElementById('status');
        let instance = this;

        this.modalRequestToken = document.getElementById('tmdb_request_token');
        this.modalRequestTokenBootstrap = new Modal(this.modalRequestToken, {});
        this.modalRequestToken.addEventListener('hidden.bs.modal', (event) => {
            if (instance.config.requestToken !== '') {
                instance.getAccessToken().then(() => {
                    instance.toolbarButtonsEnabled(true);
                });
            }
        });

        this.loadConfig();

        document.getElementById('apiKeyV4').addEventListener('change', (event) => {
            instance.clearStorage();
            instance.config.apiKeyV4 = event.target.value;
            localStorage.setItem('apiKeyV4', event.target.value);
            if (instance.config.apiKeyV4 !== '') {
                instance.loadConfig();
            }
        });

        document.getElementById('initialize').addEventListener('click', () => {
            instance.getRequestToken();
        });

        document.getElementById('getWatchlists').addEventListener('click', () => {
            instance.getWatchlist();
        });

        document.getElementById('search').addEventListener('input', (event) => {
            instance.search();
        });
    }

    toolbarButtonsEnabled(enabled) {
        this.toolbar = document.querySelector('.toolbar');
        this.toolbar.querySelectorAll('button').forEach(button => {
            if (enabled) {
                button.classList.add('btn-primary');
                button.classList.remove('disabled', 'btn-secondary');
            } else {
                button.classList.remove('btn-primary');
                button.classList.add('disabled', 'btn-secondary');
            }
        });

        let buttonInitialize = this.toolbar.querySelector('#initialize');
        if (enabled) {
            buttonInitialize.classList.add('btn-secondary');
            buttonInitialize.classList.remove('disabled', 'btn-primary');
        } else {
            buttonInitialize.classList.remove('disabled', 'btn-secondary');
            buttonInitialize.classList.add('btn-primary');
        }
    }

    updateStatus(message, current, total) {
        if (typeof current === 'undefined' || current < 0) {
            current = 0;
        }
        if (typeof total === 'undefined' || total < 0) {
            total = 0;
        }
        this.progressBar.value = current;
        this.progressBar.max = total;

        if (total > 0) {
            message += ' (' + current + ' of ' + total + ')'
        }
        this.status.innerHTML = message;
    }

    getAjax(url, headers, data) {
        let method = 'GET';
        if (!(typeof headers === 'object' && headers !== null)) {
            headers = {};
        }
        if (typeof data === 'object' && data !== 'undefined') {
            method = 'POST';
            // headers['Content-Type'] = 'application/json; charset=utf-8';
            headers['Content-Type'] = 'application/json';
            data = JSON.stringify(data);
        }
        headers['Accept'] = 'application/json';

        return new Promise((resolve, reject) => {
            fetch(url, {
                mode: 'cors',
                cache: 'no-cache',
                method: method,
                headers: headers,
                body: data
            }).then(result => result.json()).then(object => {
                resolve(object);
            }).catch(error => {
                console.error('Ajax request_token:', error);
                reject(error.responseText);
            });

            /*
            @todo @deprecated if something fail
            $.ajax({
                async: true,
                crossDomain: true,
                url: url,
                headers: headers,
                method: method,
                contentType: 'application/json; charset=utf-8',
                data: data
            }).done(function(response) {
                resolve(response);
            }).fail(function(response) {
                reject(response.responseText);
            });*/
        });
    }

    getApi3(path, data) {
        let instance = this;
        return this.getAjax('https://api.themoviedb.org/3/' + path, {
            'Authorization': 'Bearer ' + (instance.config.accessToken !== '' ? instance.config.accessToken : instance.config.apiKeyV4)
        }, data);
    }

    getApi(path, data) {
        let instance = this;
        return this.getAjax('https://api.themoviedb.org/4/' + path, {
            'Authorization': 'Bearer ' + (instance.config.accessToken !== '' ? instance.config.accessToken : instance.config.apiKeyV4)
        }, data);
    }

    clearStorage() {
        this.config.requestToken = '';
        this.config.accessToken = '';
        this.config.accountId = '';
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('accountId');
    }

    // Get request token and authenticate in Website
    getRequestToken() {
        let instance = this;
        this.clearStorage();
        this.getApi('auth/request_token', {}).then(function (data) {
            instance.config.requestToken = data.request_token;
            instance.updateStatus('Confirm request token.');

            let url = instance.config.website + 'auth/access?request_token=' + instance.config.requestToken;
            instance.modalRequestTokenBootstrap.show();
            window.open(url);
        }).catch(error => console.error('Ajax request_token:', error));
    }

    // Get access token by authenticated request token
    getAccessToken() {
        let instance = this;
        return new Promise((resolve, reject) => {
            this.getApi('auth/access_token', {request_token: instance.config.requestToken}).then((data) => {
                if (!data.hasOwnProperty('access_token')) {
                    console.error('Ajax access_token: missing')
                }
                if (!data.hasOwnProperty('account_id')) {
                    console.error('Ajax account_id: missing')
                }

                instance.config.accessToken = data.access_token;
                instance.config.accountId = data.account_id;
                sessionStorage.setItem('accessToken', instance.config.accessToken);
                sessionStorage.setItem('accountId', instance.config.accountId);
                instance.updateStatus('Access token valid!');
                resolve('Access token valid!');
            }).catch(error => {
                console.error('Ajax access_token:', error);
                instance.updateStatus('Error: Access token invalid!');
                reject('Request Token not set!');
            });
        });
    }

    loadConfig() {
        if (this.config.apiKeyV4 === '') {
            this.config.apiKeyV4 = document.getElementById('apiKeyV4').value;
            if (this.config.apiKeyV4 === '') {
                if (localStorage.getItem('apiKeyV4') && localStorage.getItem('apiKeyV4') !== '') {
                    this.config.apiKeyV4 = localStorage.getItem('apiKeyV4');
                } else {
                    this.updateStatus('Error: API Key missing!');
                    return;
                }
            }
        }

        if (this.config.accessToken === '' || this.config.accountId === '') {
            if (sessionStorage.getItem('accessToken') && sessionStorage.getItem('accessToken') !== '' &&
                sessionStorage.getItem('accountId') && sessionStorage.getItem('accountId') !== '') {
                this.config.accessToken = sessionStorage.getItem('accessToken');
                this.config.accountId = sessionStorage.getItem('accountId');
                this.updateStatus('Access token maybe valid!');
                this.toolbarButtonsEnabled(true);
            } else {
                this.getRequestToken();
            }
        }
    }

    capitalizeFirstLetter([first, ...rest], locale = navigator.language) {
        return first.toLocaleUpperCase(locale) + rest.join('');
    }

    waitForIt(condition, callback, milliseconds) {
        let instance = this;
        if (!condition()) {
            setTimeout(() => {
                instance.waitForIt(condition, callback, milliseconds)
            }, milliseconds);
        } else {
            callback();
        }
    }

    createMovieEntity(movie, type) {
        let title = '';
        if (movie.hasOwnProperty('title')) {
            title = movie.title;
        } else if (movie.hasOwnProperty('name')) {
            title = movie.name;
        } else if (movie.hasOwnProperty('original_name')) {
            title = movie.original_name;
        }

        let year = 0;
        if (movie.hasOwnProperty('release_date')) {
            year = movie.release_date.substr(0, 4);
            year = parseInt(year, 10);
        } else if (movie.hasOwnProperty('first_air_date')) {
            year = movie.first_air_date.substr(0, 4);
            year = parseInt(year, 10);
        }
        if (!Number.isInteger(year)) {
            year = 0;
        }

        return {
            type: type ? type : 'movie',
            id: movie.id,
            title: title,
            year: year,
            image: movie.hasOwnProperty('poster_path') ? movie.poster_path : '',
            providers: [],
        }
    }

    async getWatchlist() {
        let instance = this;
        await this.getWatchlistMoviesOrTv('movie').then(movies => {
            movies.forEach(movie => {
                instance.renderMovieOrtTv(movie);
                instance.getProvidersMovieOrTv(movie);
            });
        }).catch(console.error);

        await this.getWatchlistMoviesOrTv('tv').then(movies => {
            movies.forEach(movie => {
                instance.renderMovieOrtTv(movie);
                instance.getProvidersMovieOrTv(movie);
            });
        }).catch(console.error);

        task.enqueueTask('Organize', () => {
            instance.waitForIt(() => {
                return this.providerProgress.current > 0 && this.providerProgress.current === this.providerProgress.total;
            }, () => {
                instance.sortMoviesContainer();
                instance.sortProviderContainer();
                instance.search();

                setTimeout(() => {
                    instance.updateStatus('Done');
                }, 500);
            }, 1000);
        });
    }

    getWatchlistMoviesOrTv(type, page, movies = []) {
        if (typeof type === 'undefined' || type === '') {
            type = 'movie';
        }

        if (typeof page === 'undefined' || page <= 0) {
            page = 1;
            this.updateStatus('Load ' + this.capitalizeFirstLetter(type) + 's');
        }

        let instance = this;
        return new Promise((resolve, reject) => this.getApi('account/' + instance.config.accountId + '/' + type + '/watchlist?page=' + page + '&sort_by=release_date.asc&language=de-DE').then(function (data) {
            if (data.hasOwnProperty('results') && data.results.length > 0) {
                // movies = movies.concat(data.results);
                for (let i = 0; i < data.results.length; i++) {
                    movies.push(instance.createMovieEntity(data.results[i], type));
                }

                if (data.hasOwnProperty('total_pages') && page < data.total_pages) {
                    page++;
                    if (data.hasOwnProperty('total_results')) {
                        instance.updateStatus('Load ' + instance.capitalizeFirstLetter(type) + 's', page * data.results.length, data.total_results);
                    } else {
                        instance.updateStatus('Load ' + instance.capitalizeFirstLetter(type) + 's', page, data.total_pages);
                    }
                    instance.getWatchlistMoviesOrTv(type, page, movies).then(resolve).catch(reject)
                } else {
                    instance.updateStatus(instance.capitalizeFirstLetter(type) + 's loaded');
                    resolve(movies);
                }
            }
        }).catch(error => console.error('Ajax watchlist movies:', error)));
    }

    renderMovieOrtTv(movie) {
        let elementId = movie.type + '-' + movie.id;
        if (document.getElementById(elementId)) {
            return;
        }

        let element = document.createElement('div');
        element.id = elementId;
        element.title = movie.title;
        element.dataset.year = movie.year;
        element.classList.add('movie');
        element.innerHTML = '' +
            '<a href="' + this.config.website + movie.type + '/' + movie.id + '" target="_blank">' +
            '<img src="' + this.netslumCacheDirectUrl + this.config.imageUrl + movie.image + '">' +
            '</a><br>' + movie.title + ' (' + movie.year + ')' + '<br>' +
            '<a href="https://www.justwatch.com/de/Suche?q=' + movie.title + '" target="_blank">' +
            '<img src="https://www.justwatch.com/appassets/favicon.ico" title="Just Watch" style="width: 32px;">' +
            '</a> ' +
            '<a href="https://www.werstreamt.es/filme-serien/?q=' + movie.title + '" target="_blank">' +
            '<img src="https://www.werstreamt.es/themes/wse/images/touch-icon-iphone.png" title="Wer streamt es" style="width: 32px;">' +
            '</a>';

        this.moviesContainer.append(element);
    }

    getProvidersMovieOrTv(movie) {
        let instance = this;
        let providerContainer = document.querySelector('.js-providers');
        task.enqueueTask('Get provider', (movie) => {
            this.providerProgress.total++;
            instance.getApi3(movie.type + '/' + movie.id + '/watch/providers').then((data) => {
                if (data.hasOwnProperty('results') && data.results.hasOwnProperty('DE') && data.results.DE.hasOwnProperty('flatrate')) {
                    let movieElement = document.getElementById(movie.type + '-' + movie.id);
                    let providersElement = movieElement.querySelector('.providers');
                    if (!providersElement) {
                        providersElement = document.createElement('div');
                        providersElement.classList.add('providers');
                        movieElement.append(providersElement);
                    }

                    data.results.DE.flatrate.forEach(provider => {
                        let providerId = 'provider-' + provider.provider_id;
                        if (!providerContainer.querySelector('#' + providerId)) {
                            let isTop = instance.config.providerTop.includes(provider.provider_id);
                            let providerCheckbox = document.createElement('div');
                            providerCheckbox.dataset.title = provider.provider_name;
                            providerCheckbox.classList.add('form-check', 'form-check-inline', 'provider-check');
                            providerCheckbox.innerHTML = '' +
                                '<input class="form-check-input" type="checkbox" id="' + providerId + '" value="' + provider.provider_id + '">' +
                                '<label class="form-check-label" for="' + providerId + '">' +
                                (isTop ? '<b>' : '') + provider.provider_name + (isTop ? '</b>' : '') + '</label>';

                            providerCheckbox.addEventListener('change', () => {
                                instance.search();
                            });

                            providerContainer.append(providerCheckbox);
                        }

                        let providerElement = document.createElement('img');
                        providerElement.classList.add('provider', 'rounded', 'mt-1', 'me-1');
                        providerElement.title = provider.provider_name;
                        providerElement.dataset.id = provider.provider_id;
                        providerElement.dataset.movie = movie.id;
                        providerElement.src = this.netslumCacheDirectUrl + 'https://www.themoviedb.org/t/p/original' + provider.logo_path;

                        let url = '';
                        if (provider.provider_id === 8 || provider.provider_id === 175) {
                            url = 'https://www.netflix.com/search?q=' + encodeURIComponent(movie.title);
                        } else if (provider.provider_id === 9 || provider.provider_id === 533) {
                            url = 'https://www.amazon.de/s?i=instant-video&k=' + encodeURIComponent('"' + movie.title + '"');
                        }

                        if (url !== '') {
                            let providerLink = document.createElement('a');
                            providerLink.href = url;
                            providerLink.target = '_blank';
                            providerLink.append(providerElement);

                            providersElement.append(providerLink);
                        } else {
                            providersElement.append(providerElement);
                        }
                    });
                }
            }).catch(error => console.error('Ajax get providers:', error)).finally(() => {
                this.providerProgress.current++;
            });
        }, movie);
    }

    sortMoviesContainer() {
        let toSort = this.moviesContainer.children;
        toSort = Array.prototype.slice.call(toSort, 0);

        toSort.sort((a, b) => {
            let aord = a.title.toLowerCase();
            let bord = b.title.toLowerCase();
            return (aord > bord) ? 1 : -1;
        });

        toSort.sort((a, b) => {
            let aord = a.dataset.year > 0 ? a.dataset.year : 999999;
            let bord = b.dataset.year > 0 ? b.dataset.year : 999999;
            return (aord > bord) ? 1 : -1;
        });

        this.moviesContainer.innerHTML = '';
        for(let i = 0; i < toSort.length; i++) {
            this.moviesContainer.appendChild(toSort[i]);
        }
    }

    sortProviderContainer() {
        let container = document.querySelector('.js-providers');
        let toSort = container.children;
        toSort = Array.prototype.slice.call(toSort, 0);

        toSort.sort((a, b) => {
            let aord = a.dataset.title.toLowerCase();
            let bord = b.dataset.title.toLowerCase();
            return (aord > bord) ? 1 : -1;
        });

        container.innerHTML = '';
        for(let i = 0; i < toSort.length; i++) {
            container.appendChild(toSort[i]);
        }
    }

    search() {
        let filter = document.getElementById('search').value;

        let providerSelected = [];
        let providerCheckboxes = document.querySelectorAll('.js-providers input[id^="provider-"]')
        if (providerCheckboxes.length > 0) {
            for (let i = 0; i < providerCheckboxes.length; i++) {
                if (providerCheckboxes[i].checked) {
                    providerSelected.push(parseInt(providerCheckboxes[i].value, 10));
                }
             }
        }

        // let list = document.getElementById('movies');
        // let items = list.querySelectorAll('#movies > *');
        let items = document.querySelectorAll('#movies > *');
        for (let i = 0; i < items.length; i++) {
            let display = true;

            if (providerSelected.length > 0) {
                display = false;
                let providers = items[i].querySelectorAll('.provider');
                for (let pi = 0; pi < providers.length; pi++) {
                    let provider = providers[pi];
                    if (provider.dataset.hasOwnProperty('id') && provider.dataset.id !== '') {
                        if (providerSelected.includes(parseInt(provider.dataset.id))) {
                            display = true;
                        }
                    }
                }
            }

            if (filter !== '') {
                if (display && !(items[i].title && items[i].title !== '' && items[i].title.toLowerCase().indexOf(filter) > -1)) {
                    display = false;
                }
            }
            /*if (providers.length === 0 && filter !== '') {
                items[i].style.display = 'none';
            }*/


            /*providers.forEach(provider => {
                if (provider.title.toLowerCase().indexOf(filter) > -1) {
                    items[i].style.display = '';
                } else {
                    items[i].style.display = 'none';
                }
            });*/

            items[i].style.display = display ? '' : 'none';
        }
    }
}

module.exports = {TmdbWatchlist};
