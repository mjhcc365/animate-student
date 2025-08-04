import Link from "next/link";

interface CaseType {
  path: string;
  name: string;
  category: string;
  description: string;
  date: string;
  isNew: boolean;
}

interface CaseListProps {
  caseArray: CaseType[];
  dict: any;
}

const CaseList = (props: CaseListProps) => {
  const { caseArray = [], dict } = props;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1">
      {caseArray.map((demo: CaseType) => (
        <Link
          key={demo.path}
          href={demo.path}
          className="border border-stone-800 flex flex-col lg:flex-row p-4 gap-4 rounded-xl"
        >
          <div className="border min-h-16 border-stone-800 lg:order-1 lg:min-w-36 rounded-s ">
            image
          </div>
          <div className="flex-shrink-0">
            <span className="border border-stone-800 text-xs font-medium text-slate-300 bg-stone-700 px-3 py-1 rounded">
              {demo.isNew ? dict?.demos?.status?.new || "NEW" : ""}
            </span>
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                  {demo.name}
                </h4>
                <p className="text-sm text-stone-400 line-clamp-2">
                  {demo.description}
                </p>
              </div>
              <div className="text-xs text-stone-500 ml-4 flex-shrink-0">
                {demo.date}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-stone-400">
                {dict?.common?.category || "CATEGORY"}
              </span>
              <span className="text-sm font-semibold text-white">
                {demo.category}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CaseList;
