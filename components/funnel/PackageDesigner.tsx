"use client";

import { useEffect, useState } from "react";
import MultiStepForm from "@/components/funnel/MultiStepForm";
import type { FormStep, FormValues } from "@/lib/forms/schema";

const CUSTOMIZE_EVENT = "efs:customize-package";

/** "Customize this package" on a package card: pre-loads that package into the builder below. */
export function CustomizePackageButton({ slug, name }: { slug: string; name: string }) {
  return (
    <a
      href="#design"
      className="efs-btn efs-btn--secondary efs-btn--sm"
      aria-label={`Customize the ${name} package`}
      onClick={() => window.dispatchEvent(new CustomEvent(CUSTOMIZE_EVENT, { detail: slug }))}
    >
      Customize this package
    </a>
  );
}

interface Props {
  steps: FormStep[];
  /** Package slug → name, for the lead event's package_name. */
  packageNames: Record<string, string>;
}

interface Start {
  key: number;
  initialValues: FormValues;
  initialStep: number;
  autoFocus: boolean;
}

/** The "Design Your Package" builder (/projects#design): MultiStepForm, re-opened pre-loaded when a card asks. */
export default function PackageDesigner({ steps, packageNames }: Props) {
  const [start, setStart] = useState<Start>({ key: 0, initialValues: {}, initialStep: 0, autoFocus: false });

  useEffect(() => {
    const field = steps[0]?.fields.find((f) => f.name === "startingPackage");
    const presets = field && (field.type === "choice" || field.type === "multichoice") ? field.presets ?? {} : {};
    const onCustomize = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      if (!presets[slug]) return;
      // A fresh form, already on the "Customize" step with this package's parts switched on.
      setStart((s) => ({ key: s.key + 1, initialValues: { startingPackage: slug, ...presets[slug] }, initialStep: 1, autoFocus: true }));
    };
    window.addEventListener(CUSTOMIZE_EVENT, onCustomize);
    return () => window.removeEventListener(CUSTOMIZE_EVENT, onCustomize);
  }, [steps]);

  return (
    <MultiStepForm
      key={start.key}
      kind="package"
      steps={steps}
      initialValues={start.initialValues}
      initialStep={start.initialStep}
      autoFocus={start.autoFocus}
      submitLabel="Send my package"
      successHref="/thank-you-home"
      eventParams={(values) => ({ package_name: packageNames[values.startingPackage as string] ?? "Custom package" })}
    />
  );
}
