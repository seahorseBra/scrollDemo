function Slider(options) {
    this.options = {
        wrap: options.wrap,
        inner: options.inner,
        dots: options.dots,
        speed: options.speed,
        auto: options.auto
    }

    this.$slider = document.querySelector(options.wrap)
    this.$content = document.querySelector(options.inner)
    this.$dots = document.querySelector(options.dots)

    this.resize();
    this.runScroll();
    this.autoScroll();
}

Slider.prototype = {
    init: function (isResize) {
        var itemWidth = window.getComputedStyle(this.$slider).width;
        itemWidth = parseInt(itemWidth);
        var sliderItems = this.$content.children;
        var sliderSize = this.pages = sliderItems.length;
        if (!isResize) {
            sliderSize += 2;
        }
        this.$content.style.width = sliderSize * itemWidth + 'px';
        for (var i = 0; i < this.pages; i++) {
            sliderItems[i].style.width = itemWidth + 'px';
        }
        isResize ? null : this.creatDots();
    },
    creatDots: function () {
        for (var i = 0; i < this.pages; i++) {
            if (i === 0) {
                dot = '<span class="on"></span>';
            } else {
                dot += '<span></span>';
            }
        }
        this.$dots.innerHTML = dot;
    },
    resize: function () {
        var that = this;
        this.init(false);
        window.addEventListener('resize', function () {
            that.init(true)
        })
    },
    runScroll: function () {
        var that = this;
        this.slider = new BScroll(this.$slider, {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapLoop: true,
            snapSpeed: this.options.speed
        })
        this.slider.on('scrollEnd', function () {
            var currentPage = that.slider.getCurrentPage().pageX
            var dots = that.$dots.children
            for (var i = 0; i < dots.length; i++) {
                if (i === (currentPage -1)) {
                    dots[i].className = 'on'
                }else {
                    dots[i].className = ''
                }
            }
        });
    },
    autoScroll: function () {
        var that = this;
        setInterval(function () {
            that.slider.next();
        }, this.options.auto)
    }
}

new Slider({
    wrap: "#slider",
    inner: ".content",
    dots: ".dots",
    speed: 400,
    auto: 2000
})