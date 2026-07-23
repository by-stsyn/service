export default function Footer() {
  return (
    <footer className="bg-white px-4 sm:px-8 py-6 border-t border-slate-200 mt-auto flex-shrink-0">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-[10px] text-slate-400 uppercase tracking-wider">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} ГК Прагматика<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>Официальный дилер
          </p>
        </div>
        <div className="flex flex-col items-center sm:items-end gap-3">
          <div className="flex gap-3">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600 hover:bg-green-100 hover:text-green-600 transition-colors">VK</a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600 hover:bg-green-100 hover:text-green-600 transition-colors">TG</a>
          </div>
          <div className="flex gap-4 text-[10px] text-slate-400">
            <a href="#" className="hover:text-green-600 transition-colors">Политика конфиденциальности</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
