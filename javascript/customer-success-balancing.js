/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */
function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  /**
   * ===============================================
   * =========== Write your solution here ==========
   * ===============================================
   */
  const filtered = filterAway(customerSuccess, customerSuccessAway);
  const sorted = sortArray(filtered);

  const map = generetaMap(sorted);
  
  const distribution = {};

  let max;
  let maxCount = 0;

  for (let i = 0; i < customers.length; i++) {
    let customer = customers[i];
    let cs = map[customer.score];

    if (distribution[cs] === undefined) {
      distribution[cs] = 0;
    }

    distribution[cs]++;

    if (distribution[cs] > maxCount) max = cs;
  }

  return max === undefined ? 0 : max;
}

function generetaMap(sortedCustomerSuccess) {
  const map = {};

  for (let i = 0; i < sortedCustomerSuccess.length; i++) {
    let j = (i === 0
      ? 0
      : sortedCustomerSuccess[i - 1].score + 1); 

    let cs = sortedCustomerSuccess[i];
    while (j <= cs.score) {
      map[j] = cs.id;
      j++;
    }
  }

  return map;
}

test("Generate map scenario 1", () => {
  const css = [
    { id: 1, score: 2 },
    { id: 2, score: 4 },
    { id: 3, score: 5 },
  ];

  const expectedMap = {
    '0': 1,
    '1': 1,
    '2': 1,
    '3': 2,
    '4': 2,
    '5': 3,
  }

  expect(generetaMap(css)).toEqual(expectedMap)
});

function sortArray(customerSuccess) {
  return customerSuccess.sort((a, b) => a.score - b.score);
}

test("Sort scenario 1", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];

  expect(sortArray(css)).toEqual([
    { id: 2, score: 20 },
    { id: 1, score: 60 },
    { id: 4, score: 75 },
    { id: 3, score: 95 },
  ])
});

function filterAway(customerSuccess, customerSuccessAway) {
  return customerSuccess.filter(cs => !customerSuccessAway.includes(cs.id));
}

test("Filter scenario 1", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const csAway = [2, 4];

  expect(filterAway(css, csAway)).toEqual([
    { id: 1, score: 60 },
    { id: 3, score: 95 }
  ]);
});

test("Scenario 1", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

function buildSizeEntities(size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score });
  }
  return result;
}

function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

function arraySeq(count, startAt){
  const res = Array.apply(0, Array(count)).map((it, index) => index + startAt);
  // console.log(res[0], res[res.length - 1]);
  return res;
}

test("Scenario 2", () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1));
  // console.log(css);
  const customers = buildSizeEntities(10000, 998);
  // console.log(customers);
  const csAway = [999];

  // console.log(generetaMap(css));

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(998);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test("Scenario 4", () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  const css = mapEntities([100, 2, 3, 6, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});

test("Scenario 8", () => {
  const css = [
    { id: 1, score: 20 },
    { id: 2, score: 60 },
  ];
  const customers = [
    { id: 1, score: 5 },
    { id: 2, score: 10 },
    { id: 3, score: 30 },
    { id: 4, score: 40 },
  ];
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});