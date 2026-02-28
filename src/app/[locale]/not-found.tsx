import { Link } from "@/i18n/navigation";

export default function NotFound() {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
            <h1 className="font-heading text-2xl font-bold text-mercury-900 mb-2">
                404
            </h1>
            <p className="text-mercury-500 mb-6">Pagina nu a fost găsită</p>
            <Link
                href="/"
                className="bg-mercury-900 text-white px-6 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
                Înapoi la Acasă
            </Link>
        </div>
    );
}
