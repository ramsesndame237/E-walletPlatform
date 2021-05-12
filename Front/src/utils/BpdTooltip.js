export default class Tooltip {
    /**
     * Applique le système de bulle d'info sur les éléments
     * @param {String} selector 
     */
    static bind(selector) {
        document.querySelectorAll(selector).forEach(element => {
            this.element = element
            let tooltipTarget = this.element.getAttribute('data-tooltip')
            if (tooltipTarget) {
                this.title = document.querySelector(tooltipTarget)
                this.text = false
            } else {
                this.text = true
                this.title = element.getAttribute('title')
            }
            this.tooltip = null
            console.log(element)
            this.element.addEventListener('mouseover', this.mouseOver.bind(this))
            this.element.addEventListener('mouseout', this.mouseOut.bind(this))
            
        })
    }

    speak(text) {
        console.log(text)
    }

    mouseOver() {
        console.log('over')
        let tooltip = this.createTooltip()
        let width = this.tooltip.offsetWidth
        let height = this.tooltip.offsetHeight
        let left = this.element.offsetWidth / 2 - width / 2 + this.element.getBoundingClientRect().left + document.documentElement.scrollLeft
        let top = this.element.getBoundingClientRect().top - height - 15 + document.documentElement.scrollTop
        if (left < 20) {
            left = 20
        }
        tooltip.style.left = left + 'px'
        tooltip.style.top = top + 'px'
        setTimeout(() => {
            tooltip.classList.add('visible')
        }, 250)
    }

    mouseOut() {
        if (this.tooltip !== null) {
            setTimeout(() => {
                this.tooltip.classList.remove('visible')
            }, 250)
            this.tooltip.addEventListener('transitionend', () => {
                if (this.tooltip !== null) {
                    document.body.removeChild(this.tooltip)
                    this.tooltip = null
                }
            })
        }
    }

    /**
     * Crée et inject la tooltip dans le DOM
     * @return {HTMLElement}
     */
    createTooltip() {
        if (this.tooltip === null) {
            let tooltip = document.createElement('div')
            if (this.text) {
                tooltip.innerHTML = this.title
            } else {
                this.title.classList.remove('hided')
                tooltip.appendChild(this.title)
            }
            tooltip.classList.add('tippy')
            document.body.appendChild(tooltip)
            this.tooltip = tooltip
        }
        return this.tooltip
    }
}

Tooltip.bind('#forTooltip')
