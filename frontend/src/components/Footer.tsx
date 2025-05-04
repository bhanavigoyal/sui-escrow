
export const Footer=()=>{
    return <footer className="text-center text-sm text-zinc-400 py-4 flex flex-col items-center gap-1">
    <div>
      Minted with ❤️ on <strong>Sui</strong> • Powered by Move
    </div>
    <div className="flex items-center space-x-5">
        <a
        href="https://github.com/bhanavigoyal"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-zinc-300"
        >
            <img src="/github-mark-white.svg" className="w-4 h-4"/>
        </a>
        <a
        href="https://x.com/bhanavigoyal"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 hover:text-zinc-300"
        >
            <img src="/11053981_x_logo_twitter_new_brand_icon.svg" className="bg-neutral-50 w-4 h-4"/>
        </a>

    </div>
    </footer>
}