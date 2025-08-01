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
}

const CaseList = (props: CaseListProps) => {
  const { caseArray = [] } = props;
  return (
    <div className="space-y-8">
      {caseArray.map((demo: CaseType) => (
        <Link
          key={demo.path}
          href={demo.path}
          className="border border-gray-800 flex flex-col p-4 gap-4 rounded-xl"
        >
          <div className="border border-gray-800">image</div>
          <div className="flex-shrink-0">
            <span className="border border-gray-800 text-xs font-medium text-slate-300 bg-slate-700 px-3 py-1 rounded">
              NEW RESOURCE
            </span>
          </div>
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                  {demo.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-400">CATEGORY</span>
                  <span className="text-sm font-semibold text-white">
                    {demo.category}
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-500 ml-4 flex-shrink-0">
                {demo.date}
              </div>
            </div>
            <p className="text-sm text-slate-400 line-clamp-2">
              {demo.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CaseList;
