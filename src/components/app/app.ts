import Basket from "../basket/basket";
import CardProduct from "../cardProductPage/cardProductPage";
import ErrorPage from "../error404/errorPage";
import FilterPage from "../filterPage/filterPage";
import { IPage } from "../IPage";
import { PageIDs } from "../types";

export default class App {
    container: HTMLElement;

    constructor(content: HTMLElement) {
        this.container = content;
        this.changeRouteHandler();
        this.run();
    }
    
    renderNewPage(id: PageIDs) {
        this.container?.childNodes.forEach((node) => this.container.removeChild(node));
        let newPage: IPage | null = null; 

        if (id === PageIDs.FilterPage) {
            newPage = new FilterPage();
        } else if (id === PageIDs.CardProductPage) {
            newPage = new CardProduct();
        } else if (id === PageIDs.CartPage) {
            newPage = new Basket();
        } else if (id === PageIDs.ErrorPage) {
            newPage = new ErrorPage();
        }

        if (newPage) {
            const pageHTML = newPage.getPage();
            this.container.append(pageHTML);
        }
    }

    changeRouteHandler() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            console.log(hash);
            this.renderNewPage(hash as PageIDs);
        })
    }

    run() {
        let hash = window.location.hash.slice(1) as PageIDs;
        if (hash !== PageIDs.CardProductPage &&
            hash !== PageIDs.CartPage &&
            hash !== PageIDs.FilterPage
        ) {
            this.setLocation(PageIDs.ErrorPage);
        } else {
            this.renderNewPage(hash);
        }
    }

    setLocation(page: PageIDs) {
        try {
          history.pushState(null, '', page);
          return;
        } catch(e) {
            console.log(e);
        }
        location.hash = `#${page}`;
    }
}
