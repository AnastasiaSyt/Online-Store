import Basket from "../basket/basket";
import CardProduct from "../cardProductPage/cardProductPage";
import ErrorPage from "../error404/errorPage";
import FilterPage from "../filterPage/filterPage";
import { IPage } from "../IPage";
import { PageIDs } from "../types";

interface IApp {
    container: HTMLElement,
    handlerGlobalRoutes: () => void,
    renderNewPage: (id: PageIDs) => void,
    changeRouteHandler: () => void,
    locationHandler: () => void,
    recognizeUrl: (url: string) => PageIDs,
    run: () => void,
    setLocation: (page: PageIDs) => void
}

export default class App implements IApp {
    container: HTMLElement;

    constructor(content: HTMLElement) {
        this.container = content;
        this.handlerGlobalRoutes();
        this.changeRouteHandler();
        this.run();
    }

    handlerGlobalRoutes() {
        const filterPage = document.getElementById('filterPage');
        filterPage?.addEventListener('click', () => {
            this.setLocation(PageIDs.FilterPage);
        });
        const basketPage = document.getElementById('basketPage');
        basketPage?.addEventListener('click', () => {
            this.setLocation(PageIDs.CartPage);
        });
        const cardProductPage = document.getElementById('cardProductPage');
        cardProductPage?.addEventListener('click', () => {
            this.setLocation(PageIDs.CardProductPage);
        });
    }

    renderNewPage(id: PageIDs) {

        this.container?.childNodes.forEach((node) => this.container.removeChild(node));
        let newPage: IPage | null = null;

        if (id === PageIDs.FilterPage) {
            newPage = new FilterPage();
        } else if (id === PageIDs.CardProductPage) {
            const pathName = window.location.pathname;
            const itemId = Number(pathName.split('_').pop());
            newPage = new CardProduct(itemId);
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
        window.addEventListener('popstate', this.locationHandler.bind(this));
    }

    locationHandler() {
        let location = window.location.pathname;
        if (location.length === 0) {
            location = "/";
        }
        const route = this.recognizeUrl(location);
        this.renderNewPage(route);
    }

    recognizeUrl(url: string): PageIDs {
        if (url === '/') {
            return PageIDs.FilterPage;
        }
        url = url.substring(1);

        if (url.indexOf(PageIDs.CardProductPage) === 0) {
            return PageIDs.CardProductPage;
        }
        if (url !== PageIDs.CardProductPage &&
            url !== PageIDs.CartPage &&
            url !== PageIDs.FilterPage
        ) {
            return PageIDs.ErrorPage;
        }
        return url as PageIDs;
    }

    run() {
        const url = this.recognizeUrl(window.location.pathname);
        if (url !== PageIDs.CardProductPage &&
            url !== PageIDs.CartPage &&
            url !== PageIDs.FilterPage
        ) {
            this.setLocation(PageIDs.ErrorPage);
        } else {
            this.renderNewPage(url);
        }
    }

    setLocation(page: PageIDs) {
        window.history.pushState({}, "", page);
        this.locationHandler();
    }
}
