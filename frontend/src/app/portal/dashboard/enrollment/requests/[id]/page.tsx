"use client";

import { Card } from "@/components/cards";
import { Spinner } from "@/components/spinner";
import { useFetchEnrollmentDetails } from "@/utils/fetchEnrollmentData";
import { use, useEffect } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const CoursePage: React.FC<Props> = ({ params }: Props) => {
  const unwrappedParams = use(params);
  const { isLoading, data, isFetched } = useFetchEnrollmentDetails(
    unwrappedParams.id
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Card>{isLoading && !isFetched && !!data ? <Spinner /> : <p></p>}</Card>
  );
};

export default CoursePage;
