import "./Fullscroll.scss";
import { useEffectMemo } from "libs/utils";

const cls_fullscroll = "fullscroll";
const cls_fullscrollSection = "fullscroll__section";
const cls_fullscrollActive = "fullscroll__section--active";
const cls_fullscrollFirstActive = "fullscroll__section--first-active";
const atr_fullscroll = "data-fullscroll";
const atr_fullscroll_current = "data-fullscroll-current";

const useFullscroll = (name: string, onAtiveChange: (active: boolean, direction?: ScrollDirectionType, root?: HTMLElement) => void) => {
  useEffectMemo(() => {
    if (window["fullscroll"]) {
      const fullscroll = window["fullscroll"] as FullscrollControll;
      fullscroll.addItemActiveListener(name, (_, active, direction, root) => {
        onAtiveChange(active, direction, root);
      });
    } else {
      console.warn("fullscroll control instance not found. call createFullscroll first!");
    }
  }, [window["fullscroll"]]);
};

export default useFullscroll;

export const createFullscroll = (rootSelector: string): FullscrollControll => {
  const control = new FullscrollControll(rootSelector);
  window["fullscroll"] = control;
  return control;
};

const addEventListener = (el: { addEventListener: Function }, s: string, fn: Function) => {
  s.split(" ").forEach((e) => el.addEventListener(e, fn, false));
};

const removeEventListener = (el: { removeEventListener: Function }, s: string, fn: Function) => {
  s.split(" ").forEach((e) => el.removeEventListener(e, fn, false));
};

export { addEventListener, removeEventListener };

// controller

type ActiveCallbackType = (itemName: string, active: boolean, direction: ScrollDirectionType, item: HTMLElement) => void;
type ScrollDirectionType = "up" | "down";

class FullscrollControll {
  private root: string = "";
  private elements: HTMLElement[] = [];
  private activeIdx: number = -1;
  private activing = false;
  private activeCallback: ActiveCallbackType | null = null;
  private itemActiveListeners: { [key: string]: ActiveCallbackType } = {};
  private activeTimeDelay = 800; // ms

  constructor(root: string) {
    this.root = root;
    addEventListener(window, "mousewheel DOMMouseScroll", this.onScrollEvent.bind(this));
    addEventListener(window, "DOMContentLoaded resize", this.onResizeEvent.bind(this));
    document.querySelector(this.root)?.classList.add(cls_fullscroll);
  }

  init(itemSelector: string, activeItem: string) {
    const items = document.querySelectorAll<HTMLElement>(itemSelector);
    items.forEach((item) => {
      const active = item.getAttribute(atr_fullscroll) === activeItem;
      this.addElement(item, active);
    });
  }

  destroy() {
    removeEventListener(window, "mousewheel DOMMouseScroll", this.onScrollEvent.bind(this));
    removeEventListener(window, "DOMContentLoaded resize", this.onResizeEvent.bind(this));
    document.body.removeAttribute(atr_fullscroll_current);
    document.querySelector(this.root)?.classList.remove(cls_fullscroll);
    this.elements = [];
    this.itemActiveListeners = {};
    this.activeCallback = null;
    this.activeIdx = -1;
    this.activing = false;
  }

  addElement(elm: HTMLElement, defaultActive: boolean = false) {
    let exist = false;
    let itemIdx = -1;
    for (let index = 0; index < this.elements.length; index++) {
      const element = this.elements[index];
      if (element === elm) {
        exist = true;
        itemIdx = index;
        break;
      }
    }
    if (!exist) {
      this.elements.push(elm);
      elm.classList.add(cls_fullscrollSection);
      itemIdx = this.elements.length - 1;
    }

    if (defaultActive && this.activeIdx === -1) {
      this.setItemActive(itemIdx, "up");
    }
  }

  addItemActiveListener(itemName: string, listener: ActiveCallbackType) {
    this.itemActiveListeners[itemName] = listener;
  }

  setActiveCallback(callback: ActiveCallbackType) {
    this.activeCallback = callback;
  }

  private onActive(item: HTMLElement, active: boolean, direction: ScrollDirectionType) {
    const name = item.getAttribute(atr_fullscroll) || "";
    active ? item.classList.add(cls_fullscrollActive) : item.classList.remove(cls_fullscrollActive);
    this.activeCallback?.(name, active, direction, item);
    this.itemActiveListeners[name]?.(name, active, direction, item);
    active && document.body.setAttribute(atr_fullscroll_current, name);
  }

  private setDefault() {
    this.setItemActive(0, "up");
  }

  private checkToScroll(direction: ScrollDirectionType) {
    if (direction === "up" && this.activeIdx !== -1) {
      if (this.activeIdx - 1 >= 0) {
        this.setItemActive(this.activeIdx - 1, direction);
      }
    } else if (direction === "down" && this.activeIdx !== -1) {
      if (this.activeIdx + 1 < this.elements.length) {
        this.setItemActive(this.activeIdx + 1, direction);
      }
    }
  }

  private setItemActive(index: number, direction: ScrollDirectionType) {
    if (this.activing) return; // need to wait for a time
    if (window.innerWidth < 768) return;
    if (!this.elements[index]) return;

    const first = this.activeIdx === -1;

    if (this.activeIdx !== -1 && this.elements[this.activeIdx]) {
      this.onActive(this.elements[this.activeIdx], false, direction);
      this.activeIdx = -1; // reset
    }
    this.activeIdx = index;
    // if (typeof index === "number") {
    //   this.activeIdx = index;
    // } else {
    //   for (let index = 0; index < this.elements.length; index++) {
    //     const element = this.elements[index];
    //     if (element.elm === index) {
    //       this.activeIdx = index;
    //       break;
    //     }
    //   }
    // }
    if (this.activeIdx !== -1) {
      // console.log("setactive", this.activeIdx);
      // delay time
      this.activing = true;
      const id = setTimeout(() => {
        this.activing = false;
        clearTimeout(id);
      }, this.activeTimeDelay);

      const item = this.elements[this.activeIdx];
      if (first) {
        item.classList.add(cls_fullscrollFirstActive);

        const tid = setTimeout(() => {
          item.classList.remove(cls_fullscrollFirstActive);
          clearTimeout(tid);
        }, 600);
      }
      this.onActive(item, true, direction);
    } else {
      console.log("Could not find item in array");
    }
  }

  private handleScroll(direction: ScrollDirectionType, length: number) {
    if (document.body.classList.contains("modal-open")) return;

    if (window.innerWidth < 768) {
      if (this.activeIdx !== -1 && this.elements[this.activeIdx]) {
        this.onActive(this.elements[this.activeIdx], false, direction);
      }
      this.activeIdx = -1;
      this.activing = false;
      return;
    }

    if (this.activeIdx !== -1 && this.elements[this.activeIdx]) {
      const elm = this.elements[this.activeIdx];
      // console.log("handle scroll", direction, elm.scrollTop, elm.scrollHeight, elm.clientHeight, length);
      if (direction === "up") {
        if (elm.scrollTop === 0) {
          this.checkToScroll(direction);
        } else {
          elm.scrollBy({
            top: -length,
            behavior: "smooth",
          });
        }
      } else if (direction === "down") {
        if (elm.scrollHeight - elm.scrollTop === elm.clientHeight) {
          this.checkToScroll(direction);
        } else {
          elm.scrollBy({
            top: -length,
            behavior: "smooth",
          });
        }
      }
    } else if (this.activeIdx === -1) {
      this.setDefault();
    }
  }

  private onScrollEvent(e: any) {
    if (typeof e.detail == "number" && e.detail !== 0) {
      if (e.detail > 0) {
        this.handleScroll("down", e.detail);
      } else if (e.detail < 0) {
        this.handleScroll("up", e.detail);
      }
    } else if (typeof e.wheelDelta == "number") {
      if (e.wheelDelta < 0) {
        this.handleScroll("down", e.wheelDelta);
      } else if (e.wheelDelta > 0) {
        this.handleScroll("up", e.wheelDelta);
      }
    }
  }

  private onResizeEvent() {
    if (this.activeIdx === -1) this.setDefault();
  }
}
