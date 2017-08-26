declare module "puppeteer" {
    interface GotoOptions {
        waitUntil?: "networkidle";
    }

    interface PdfOptions {
        path: string;
        format: "A4";
        printBackground: boolean;
    }

    interface Page {
        goto: (url: string, options: GotoOptions) => Promise<{}>;
        pdf: (options: PdfOptions) => Promise<{}>;
    }

    interface Browser {
        newPage: () => Page;
        close: () => void;
    }

    function launch(): Promise<Browser>;
}
