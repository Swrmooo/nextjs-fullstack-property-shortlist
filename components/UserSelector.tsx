type UserSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

const mockUsers = [
  { id: "user-1", name: "Alice" },
  { id: "user-2", name: "Ben" },
  { id: "user-3", name: "Cara" },
];

export function UserSelector({ value, onChange }: UserSelectorProps) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 text-sm shadow-sm">
      <span className="font-medium text-zinc-700">User</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500"
      >
        {mockUsers.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </label>
  );
}
