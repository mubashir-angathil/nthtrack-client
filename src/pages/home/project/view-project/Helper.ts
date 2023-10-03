interface IssueProps {
  id: string;
  title: string;
  status: "closed" | "opened";
  description: string;
  createdAt: string;
}
export const issues: IssueProps[] = [
  {
    id: "1",
    title: "Admin dashboard",
    status: "closed",
    description:
      "Lorem ipsum mkae the sec avoid the tabel title to increase the letter frequency",
    createdAt: "20-20-2002 12.12.12 am",
  },
  {
    id: "2",
    title: "Encusta",
    status: "opened",
    description:
      "Lorem ipsum mkae the sec avoid the tabel title to increase the letter frequency",
    createdAt: "20-20-2002 12.12.12 am",
  },
  {
    id: "3",
    title: "FMS",
    status: "closed",
    description:
      "Lorem ipsum mkae the sec avoid the tabel title to increase the letter frequency",
    createdAt: "20-20-2002 12.12.12 am",
  },
];
