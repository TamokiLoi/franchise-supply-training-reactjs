type Props = {
  keyword: string;
  setKeyword: (value: string) => void;
};

export default function Search({ keyword, setKeyword }: Props) {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search customer..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border px-3 py-2 rounded-lg md:w-72 w-56 outline-none 
        focus:ring-2 focus:ring-blue-400 transition"
      />
    </div>
  );
}
