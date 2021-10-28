var player, playerState = null;

class Picture {
    constructor(id) {
        this._id = id;
        this._picture = document.createElement('picture');
        this._picture.classList.add('hidden');
    }

    sourceAdd(dimension, orientation, media) {
        const source = document.createElement('source');

        source.setAttribute('srcset', `./img/${this._id}/${dimension}-${orientation}.jpg`);
        source.setAttribute('media', media);

        this.picture.append(source);
    }
    imgAdd(dimension, orientation) {
        const img = document.createElement('img');

        img.setAttribute('src', `./img/${this._id}/${dimension}-${orientation}.jpg`);
        this.picture.append(img);
    }

    get picture() {
        return this._picture;
    }
    get visible() {
        return !this._picture.classList.contains('hidden');
    }
    set visible(value) {
        if (value)
            this._picture.classList.remove('hidden');
        else
            this._picture.classList.add('hidden');
    }
}
class Button {
    constructor(parent, selector) {
        this._element = parent.querySelector(selector);
        
        this._icon = this._element.querySelector('i');
        this._span = this._element.querySelector('span');
    }

    get button() {
        return this._element;
    }
    get text() {
        return this._span.textContent;
    }
    set text(value) {
        this._span.textContent = value;
    }
}
class ButtonSwitch extends Button {
    constructor(parent, selector, state) {
        super(parent, selector);
        let self = this;

        this._states = {new: state};
        this._states.original = {};

        this._icon.classList.forEach(function(value, idx, array) {
            if (value !== 'fas');
                self._states.original.class = value;
        });

        this._states.original.text = this._span.textContent;
    }

    switch(original) {
        if (original && !this.button.classList.contains(this._states.original.class)) {
            this._icon.classList.remove(this._states.new.class);
            this._icon.classList.add(this._states.original.class);

            this.text = this._states.original.text;
        }
        else if (!original && !this.button.classList.contains(this._states.new.class)){
            this._icon.classList.remove(this._states.original.class);
            this._icon.classList.add(this._states.new.class);

            this.text = this._states.new.text;
        }
    }
}

class Video {
    constructor(media) {
        this._first = true;
        this._media = media;
        this._cued = false;
        this._id = media.data.video;

        this._parent = media._container;
        this._element = this._parent.querySelector('iframe#yt-trailer');

        if (this.state && this._element) {
            this.cue(this._id);
            this._cued = true;
        }
    }

    get element() {
        return this._element;
    }
    get state() {
        return playerState;
    }
    get visible() {
        if (!this.element)
            return false;

        return parseInt(this.element.style.opacity) !== 1 ? false : true;
    }
    set visible(value) {
        if (!this.element)
            return;

        if (value && !this.visible)
            this.element.style.opacity = '1';
        else if (!value && this.visible)
            this.element.style.opacity = '';
    }
    get media() {
        return this._media;
    }
    // set the id and cue the video
    load() {
        // algo deu errado
        if (!this.green())
            return;

        if (this._cued && this._id === this.media.data.video)
            return;
        
        this._id = this.media.data.video;

        if (this.state && this.visible)
            this.halt()

        this.cue(this._id);

        if (!this._cued)
            this._cued = true;
    }

    start() {
        let self = this;

        if (!this.green()) return;

        if (!this._cued)
            this.load();

        this.visible = true;
        self.play();
        self.media.buttons.play.switch(false);

        if (!this._first)
            return;

        let state = 0, counter = 0;
        let iid = window.setInterval(function(){
            if (playerState === -1) {
                state = 1;
            }

            if (state === 1 && playerState === 5) {
                state = 2;
                self.play();
                self._first = false;
            }

            if (state === 2 || counter++ === 100)
                window.clearInterval(iid);
        }, 10);
    }
    halt() {
        this.visible = false;
        this.stop()
        this.media.buttons.play.switch(true);
    }
    cue(value) {
        player.cueVideoById(value);
    }
    play() {
        player.playVideo();
    }
    stop() {
        player.stopVideo()
    }
    green() {
        // alguma coisa deu errada
        if (!this.state)
            return false;

        // ver se o elemento esta presente agora
        if (!this.element && this._parent.querySelector('iframe#yt-trailer'))
            this._element = this._parent.querySelector('iframe#yt-trailer');

        // algo deu errado
        if (!this._element)
            return false;

        return true;
    }
}

class MediaPrincipal {
    constructor(id, video, title, description) {
        let self = this;

        this._data = {
            id: id,
            video: video,
            title: title,
            description: description
        };

        this._main  = document.querySelector('.filme-principal');
        this._container = this._main.querySelector('.container');
        this._gradient = this._container.querySelector('.picture-gradient');

        this._video = new Video(this);

        this._info = this._container.querySelector('.info-container');
        this._title = this._info.querySelector('.titulo');
        this._description = this._info.querySelector('.descricao');

        this.setData(this._data.id, this._data.video, this._data.title, this._data.description);

        this._buttons = {};
        this.buttons.play = new ButtonSwitch(this._info, '.button-play', {class: 'fa-stop', text: 'DETENER TRAILER'});


        this.buttons.play.button.addEventListener('click', function(event) {
            if (self._video.visible)
                self._video.halt();
            else
                self._video.start();
        });
    }

    _picturePopulate() {
        this._picture.sourceAdd('480', 'portrait', '(orientation: portrait) and (max-width: 479px)');
        this._picture.sourceAdd('480', 'landscape', '(orientation: landscape) and (max-width: 479px)');
        this._picture.sourceAdd('768', 'portrait', '(orientation: portrait) and (min-width: 480px) and (max-width: 1023px)');
        this._picture.sourceAdd('768', 'landscape', '(orientation: landscape) and (min-width: 480px) and (max-width: 1279px)');
        this._picture.sourceAdd('1440', 'landscape', 'screen and (min-width: 1280px) and (max-width: 1439px)');
        this._picture.sourceAdd('1920', 'landscape', 'screen and (min-width: 1440px)');
        this._picture.imgAdd('768', 'landscape');
    }

    setData(id, video, title, description) {
        let self = this;

        this._main.dataset.id = id;
        this._main.dataset.video = video;
        this._main.dataset.title = title;
        this._main.dataset.description = description;

        this.data.id = id;
        this.data.video = video;
        this.data.title = title;
        this.data.description = description;

        //load video
        this._video.load();

        //load picture
        let timeout = 0;
        if (this._picture) {
            this._picture.picture.classList.add('hidden');
            timeout = 300;
        }

        window.setTimeout(function(){
            if (this._picture)
                self._picture.picture.remove();

            self._picture = new Picture(id);
            self._picturePopulate();
            self._container.insertBefore(self._picture.picture, self._gradient);
            self._picture.visible = true;
        }, timeout);

        this.setTitle();
        this.setDescription()
    }

    get data() {
        return this._data;
    }
    get title() {
        return this._title;
    }
    get description() {
        return this._description;
    }
    getTitle() {
        return this.title.textContent;
    }
    setTitle() {
        this.title.textContent = this.data.title;
    }
    getDescription() {
        return this.description.textContent;
    }
    setDescription() {
        this.description.textContent = this.data.description;
    }

    get buttons() {
        return this._buttons;
    }
}
class Carousel {
    constructor (app) {
        let self = this;

        this._main = document.querySelector('.carrosel-filmes');
        this._container = this._main.querySelector('.owl-stage');
        this._items = this._container.children;
        this._selected = null;

        this._container.addEventListener('click', function(event){
            if (event.target.tagName !== 'IMG')
                return;

            for (let i = 0; i < self._items.length; i++) {
                let img = self._items[i].querySelector('img');

                if (img !== event.target) {
                    continue;
                }

                let selected = self._items[i].classList.contains('selected');
                if (selected)
                    return;

                self.setItemSelected(i, !selected);

                let {id, video, title, description} = self.getItemData(i);
                app.media.setData(id, video, title, description);

                return;
            }
        });
    }

    getFirstActive() {
        for(let i = 0; i < this._items.length; i++) {
            if (this._items[i].classList.contains('active'))
                return (this._items[i]);
        }
    }
    getFirstActiveIndex() {
        for(let i = 0; i < this._items.length; i++) {
            if (this._items[i].classList.contains('active'))
                return (i);
        }
    }
    getItemData(idx) {
        const image = this._items[idx].querySelector('img');

        return image.dataset;
    }
    setItemSelected(idx, selected) {
        if (!selected && this._selected === null)
            return;

        if (!selected){
            this._items[this._selected].classList.remove('selected');
            this._selected = null;
            
            return;
        }

        if (selected && this._selected === null) {
            this._selected = idx;
            this._items[idx].classList.add('selected');

            return;
        }

        if (selected) {
            this._items[this._selected].classList.remove('selected');
            this._items[idx].classList.add('selected');
            this._selected = idx
        }
    }
}

window.addEventListener('load', event => {
    let app = {};

    app.carrosel = new Carousel(app);
    let idx = app.carrosel.getFirstActiveIndex();

    app.carrosel.setItemSelected(idx, true);
    let {id, video, title, description} = app.carrosel.getItemData(idx);

    app.media = new MediaPrincipal(id, video, title, description);
});



function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-trailer', {
    width: '100vw',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
    playerState = player.getPlayerState();
}

function onPlayerStateChange(event) {
    playerState = player.getPlayerState();
}