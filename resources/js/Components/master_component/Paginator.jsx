import { Link } from "@inertiajs/react";

const Paginator = (props) => {

    const prev = props.meta.links[0].url;
    const next = props.meta.links[props.meta.links.length - 1].url;
    const current = props.meta.current_page;

    return (
        <div>
            <div className="join bg-slate-400">
               <Link href={prev} className="join-item btn btn-outline" onClick={() => props.onClick()}>«</Link>
                <button className="join-item btn">Page {current}</button>
                {next && <Link href={next} className="join-item btn btn-outline" onClick={() => props.onClick()}>»</Link>}
            </div>
        </div>
    )
};

export default Paginator;