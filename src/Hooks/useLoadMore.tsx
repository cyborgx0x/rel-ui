import { useEffect, useMemo, useState } from 'react';

interface Props<T> {
  data: T[];
  isFetching: boolean;
  totalData: number;
  loadingFetchMoreData: boolean;
}

function useLoadMore<T>(props: Props<T>) {
  const { isFetching, totalData, data, loadingFetchMoreData } = props;
  const [fetchedData, setFetchedData] = useState(data ?? []);

  const fetchedDataLength = useMemo(() => fetchedData.length, [fetchedData]);
  const showLoadAllData = useMemo(() => !loadingFetchMoreData && isFetching, [loadingFetchMoreData, isFetching]);
  const hasMore = useMemo(() => totalData - fetchedDataLength > 0, [fetchedDataLength, totalData]);

  useEffect(() => {
    // refresh fetched data when query with different params
    if (showLoadAllData) {
      setFetchedData([]);
    }
  }, [showLoadAllData]);

  useEffect(() => {
    if (data.length) {
      setFetchedData((state) => [...state, ...data]);
    } else {
      setFetchedData([]);
    }
  }, [data]);

  return { showLoadAllData, hasMore, fetchedData };
}

export default useLoadMore;
