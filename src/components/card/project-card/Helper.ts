type ProjectCardType = {
  projectTitle: string;
  status: "opened" | "closed";
  numberOfIssues: number;
  description: string;
};
export interface ProjectCardComponentProps {
  projects: ProjectCardType[];
}
