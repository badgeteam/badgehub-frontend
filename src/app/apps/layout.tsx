import { LayoutProps } from "../../../.next/types/app/layout";

export default function AppsListingLayout(props: LayoutProps) {
  return (
    <main>
      <h1>Apps</h1>
      {props.children}
    </main>
  );
}
