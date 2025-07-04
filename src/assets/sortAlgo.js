function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const bubble = async (props) => {
  const { arr, barColors, speed, setBarColors, setArr, setIsDisabled } = props;
  setIsDisabled(true);

  const tempArr = [...arr];
  const colors = [...barColors];
  const len = tempArr.length;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      // Highlight bars being compared
      colors[j] = "blue";
      colors[j + 1] = "blue";
      setBarColors([...colors]);
      await delay(speed);

      if (tempArr[j] > tempArr[j + 1]) {
        // Mark red for swap
        colors[j] = "red";
        colors[j + 1] = "red";
        setBarColors([...colors]);

        await delay(speed);

        // Swap the elements
        [tempArr[j], tempArr[j + 1]] = [tempArr[j + 1], tempArr[j]];
        setArr([...tempArr]);
      } else {
        // Mark green if already sorted
        colors[j] = "green";
        colors[j + 1] = "green";
        setBarColors([...colors]);

        await delay(speed);
      }

      // Reset back to neutral (pink)
      colors[j] = "pink";
      colors[j + 1] = "pink";
    }

    // Mark the last sorted index
    colors[len - i - 1] = "green";
    setBarColors([...colors]);
  }
  colors[0] = "green";
  setBarColors([...colors]);
  setIsDisabled(false);
};
const quick = async (props) => {
  const { arr, barColors, speed, setBarColors, setArr, setIsDisabled } = props;
  setIsDisabled(true);

  const tempArr = [...arr];
  const colors = [...barColors];
  const len = tempArr.length;

  await quickHelper(0, len - 1);

  // After sorting complete, set all bars to green
  for (let i = 0; i < len; i++) {
    colors[i] = "green";
  }
  setBarColors([...colors]);

  async function quickHelper(i, j) {
    if (i >= j) return;

    let pivotIndex = i;
    let pivot = tempArr[pivotIndex];
    let low = i + 1;
    let high = j;

    // Highlight the pivot
    colors[pivotIndex] = "yellow";
    setBarColors([...colors]);
    await delay(speed);

    while (low <= high) {
      while (low <= high && tempArr[low] < pivot) {
        colors[low] = "blue"; // comparing
        setBarColors([...colors]);
        await delay(speed);
        colors[low] = "pink";
        low++;
      }

      while (low <= high && tempArr[high] > pivot) {
        colors[high] = "blue"; // comparing
        setBarColors([...colors]);
        await delay(speed);
        colors[high] = "pink";
        high--;
      }

      if (low <= high) {
        [tempArr[low], tempArr[high]] = [tempArr[high], tempArr[low]];

        colors[low] = "red";
        colors[high] = "red";
        setArr([...tempArr]);
        setBarColors([...colors]);
        await delay(speed);

        colors[low] = "pink";
        colors[high] = "pink";

        low++;
        high--;
      }
    }

    [tempArr[pivotIndex], tempArr[high]] = [tempArr[high], tempArr[pivotIndex]];
    setArr([...tempArr]);

    // Highlight the swap
    colors[pivotIndex] = "red";
    colors[high] = "red";
    setBarColors([...colors]);
    await delay(speed);

    colors[pivotIndex] = "pink";
    colors[high] = "green"; // assume this index is sorted
    setBarColors([...colors]);

    await quickHelper(i, high - 1);
    await quickHelper(high + 1, j);
  }
  setIsDisabled(false);
};

const selection = async (props) => {
  const { arr, barColors, speed, setBarColors, setArr, setIsDisabled } = props;
  setIsDisabled(true);

  const tempArr = [...arr];
  const colors = [...barColors];
  const len = tempArr.length;

  for (let i = 0; i < len; i++) {
    let minIndex = i;

    // Highlight the starting element of this pass
    colors[i] = "yellow";
    setBarColors([...colors]);
    await delay(speed);

    for (let j = i + 1; j < len; j++) {
      // Highlight comparison
      colors[j] = "blue";
      setBarColors([...colors]);
      await delay(speed);

      if (tempArr[j] < tempArr[minIndex]) {
        // Reset previous min if needed
        if (minIndex !== i) colors[minIndex] = "pink";
        minIndex = j;

        // Highlight new min
        colors[minIndex] = "orange";
        setBarColors([...colors]);
        await delay(speed);
      }

      // Reset compared bar to default
      if (j !== minIndex) colors[j] = "pink";
    }

    if (minIndex !== i) {
      // Highlight swap
      colors[i] = "red";
      colors[minIndex] = "red";
      setBarColors([...colors]);
      await delay(speed);

      // Swap the elements
      [tempArr[i], tempArr[minIndex]] = [tempArr[minIndex], tempArr[i]];
      setArr([...tempArr]);
    }

    // Mark sorted
    colors[i] = "green";
    if (minIndex !== i) colors[minIndex] = "pink";
    setBarColors([...colors]);
    await delay(speed);
  }

  // Final bar
  colors[len - 1] = "green";
  setBarColors([...colors]);
  setIsDisabled(false);
};
const insertion = async (props) => {
  const { arr, barColors, speed, setBarColors, setArr, setIsDisabled } = props;
  setIsDisabled(true);

  let tempArr = [...arr];
  const colors = [...barColors];
  const len = tempArr.length;

  for (let i = 0; i < len; i++) {
    let j = i;

    // Initial highlight of current element
    colors[j] = "yellow";
    setBarColors([...colors]);
    await delay(speed);

    while (j > 0 && tempArr[j - 1] > tempArr[j]) {
      // Highlight the pair being compared
      colors[j] = "blue";
      colors[j - 1] = "blue";
      setBarColors([...colors]);
      await delay(speed);

      // Highlight swap
      colors[j] = "red";
      colors[j - 1] = "red";
      setBarColors([...colors]);
      await delay(speed);

      // Perform swap
      [tempArr[j], tempArr[j - 1]] = [tempArr[j - 1], tempArr[j]];
      setArr([...tempArr]);

      // Mark as sorted if in right place
      colors[j] = "green";
      colors[j - 1] = "green";
      setBarColors([...colors]);
      await delay(speed);

      // Reset color
      // colors[j] = 'pink';
      // colors[j - 1] = 'pink';

      j--;
    }

    // Reset color of initially picked element
    colors[j] = "green";
    setBarColors([...colors]);
  }
  setIsDisabled(false);
};
const merge = async (props) => {
  const { arr, barColors, speed, setBarColors, setArr, setIsDisabled } = props;
  setIsDisabled(true);

  let tempArr = [...arr];
  const colors = [...barColors];
  const len = tempArr.length;

  await mergeHelper(0, len - 1);

  // Helper functions
  async function mergeHelper(low, high) {
    if (low >= high) return;
    const mid = Math.floor((low + high) / 2);
    await mergeHelper(low, mid);
    await mergeHelper(mid + 1, high);
    await merging(low, mid, high);
  }

  async function merging(low, mid, high) {
    let x = [];
    let left = low;
    let right = mid + 1;

    // Highlight current merge range
    for (let i = low; i <= high; i++) {
      colors[i] = "yellow";
    }
    setBarColors([...colors]);
    await delay(speed);

    while (left <= mid && right <= high) {
      // Highlight compared elements
      colors[left] = "blue";
      colors[right] = "blue";
      setBarColors([...colors]);
      await delay(speed);

      if (tempArr[left] <= tempArr[right]) {
        x.push(tempArr[left]);
        left++;
      } else {
        x.push(tempArr[right]);
        right++;
      }

      // Reset compared colors
      for (let i = low; i <= high; i++) {
        if (i !== left && i !== right) colors[i] = "yellow";
      }
    }

    while (left <= mid) {
      x.push(tempArr[left]);
      left++;
    }

    while (right <= high) {
      x.push(tempArr[right]);
      right++;
    }

    for (let i = low; i <= high; i++) {
      tempArr[i] = x[i - low];
      colors[i] = "green"; // Mark as sorted
      setArr([...tempArr]);
      setBarColors([...colors]);
      await delay(speed);
    }

    // Optional: reset to pink after merge
    setBarColors([...colors]);
  }
  setIsDisabled(false);
};

const radix = async (props) => {
  const { arr, barColors, speed, setBarColors, setArr, setIsDisabled } = props;
  setIsDisabled(true);

  const tempArr = [...arr];
  const colors = [...barColors];

  const getMax = (arr) => Math.max(...arr);

  const countSort = async (exp) => {
    const n = tempArr.length;
    const output = Array(n);
    const count = Array(10).fill(0);

    // Count digit occurrences
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(tempArr[i] / exp) % 10;
      count[digit]++;
      colors[i] = "blue";
      setBarColors([...colors]);
      await delay(speed / 2);
      colors[i] = "pink";
    }

    // Prefix sum
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build output array (stable sort)
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(tempArr[i] / exp) % 10;
      output[count[digit] - 1] = tempArr[i];
      count[digit]--;
    }

    // Copy output back with visualization
    for (let i = 0; i < n; i++) {
      tempArr[i] = output[i];
      setArr([...tempArr]);
      colors[i] = "green"; // Mark as updated+sorted
      setBarColors([...colors]);
      await delay(speed);
    }
  };

  const max = getMax(tempArr);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    await countSort(exp);
  }

  setIsDisabled(false);
};

const countingSort = async (props) => {
  const { arr, barColors, speed, setBarColors, setArr, setIsDisabled } = props;
  setIsDisabled(true);

  const tempArr = [...arr];
  const colors = [...barColors];
  const n = tempArr.length;

  const maxVal = Math.max(...tempArr);
  const minVal = Math.min(...tempArr);
  const range = maxVal - minVal + 1;

  const count = Array(range).fill(0);

  // Step 1: Count frequencies (no prefix sum!)
  for (let i = 0; i < n; i++) {
    count[tempArr[i] - minVal]++;
    colors[i] = "blue";
    setBarColors([...colors]);
    await delay(speed / 2);
    colors[i] = "pink";
  }

  // Step 2: Overwrite original array in sorted order
  let index = 0;
  for (let i = 0; i < range; i++) {
    while (count[i] > 0) {
      tempArr[index] = i + minVal;
      setArr([...tempArr]);

      colors[index] = "green"; // Mark as sorted immediately
      setBarColors([...colors]);

      await delay(speed);
      index++;
      count[i]--;
    }
  }

  setIsDisabled(false);
};

const bucketSort = async (props) => {
  const { arr, barColors, speed, setBarColors, setArr, setIsDisabled } = props;
  setIsDisabled(true);

  const tempArr = [...arr];
  const colors = [...barColors];
  const n = tempArr.length;

  if (n <= 1) {
    setIsDisabled(false);
    return;
  }

  const maxVal = Math.max(...tempArr);
  const minVal = Math.min(...tempArr);
  const range = maxVal - minVal + 1;
  const bucketCount = n;
  const buckets = Array.from({ length: bucketCount }, () => []);

  // Step 1: Distribute elements into buckets with animation
  for (let i = 0; i < n; i++) {
    const normalized = (tempArr[i] - minVal) / range;
    const index = Math.floor(normalized * (bucketCount - 1));
    buckets[index].push(tempArr[i]);

    colors[i] = "yellow";
    setBarColors([...colors]);
    await delay(speed);

    colors[i] = "blue";
    setBarColors([...colors]);
    await delay(speed);

    colors[i] = "pink";
    setBarColors([...colors]);
  }

  // Step 2: Sort each bucket using insertion sort animation
  let mainIndex = 0;

  for (let b = 0; b < bucketCount; b++) {
    const currentBucket = buckets[b];
    if (currentBucket.length === 0) continue;

    // Inject currentBucket into tempArr starting at mainIndex
    for (let i = 0; i < currentBucket.length; i++) {
      tempArr[mainIndex + i] = currentBucket[i];
      colors[mainIndex + i] = "pink"; // temporary, animation will handle rest
    }

    setArr([...tempArr]);
    setBarColors([...colors]);
    await delay(speed);

    // Insertion sort only the bucket slice
    await insertionforbucket({
      arr: tempArr,
      barColors: colors,
      speed,
      setBarColors,
      setArr,
      setIsDisabled: () => {},
      start: mainIndex,
      end: mainIndex + currentBucket.length,
    });

    // ✅ Important fix: Ensure sorted bars remain green after insertion
    for (let i = mainIndex; i < mainIndex + currentBucket.length; i++) {
      colors[i] = "green"; // enforce green after insertion
    }
    setBarColors([...colors]);

    mainIndex += currentBucket.length;
  }

  setIsDisabled(false);
};

const insertionforbucket = async (props) => {
  const {
    arr,
    barColors,
    speed,
    setBarColors,
    setArr,
    setIsDisabled,
    start = 0,
    end = arr.length,
  } = props;

  setIsDisabled(true);

  let tempArr = arr;
  const colors = [...barColors];

  for (let i = start; i < end; i++) {
    let j = i;

    // Highlight current element
    colors[j] = "yellow";
    setBarColors([...colors]);
    await delay(speed);

    while (j > start && tempArr[j - 1] > tempArr[j]) {
      // Compare colors
      colors[j] = "blue";
      colors[j - 1] = "blue";
      setBarColors([...colors]);
      await delay(speed);

      // Swap colors
      colors[j] = "red";
      colors[j - 1] = "red";
      setBarColors([...colors]);
      await delay(speed);

      // Perform swap
      [tempArr[j], tempArr[j - 1]] = [tempArr[j - 1], tempArr[j]];
      setArr([...tempArr]);

      // Keep green (sorted) after swap
      colors[j] = "green";
      colors[j - 1] = "green";
      setBarColors([...colors]);
      await delay(speed);

      j--;
    }

    // Final placement turns green
    colors[j] = "green";
    setBarColors([...colors]);
  }

  setIsDisabled(false);
};

export default {
  bubble,
  quick,
  selection,
  insertion,
  merge,
  radix,
  countingSort,
  bucketSort,
};
