import SectionTitle from "components/SectionTitle";

const CommonQuestions = () => {
  return (
    <section>
      <SectionTitle title="Common Question" />
      <div className="grid grid-cols-1 gap-4 p-4 sm:gap-6 md:grid-cols-3 md:gap-8 lg:gap-10">
        {data.map((item, index) => (
          <div key={index} className="rounded-md bg-blue-light p-4 text-center">
            <h6 className="font-medium"> {item.que} </h6>
            <h6 className="mt-3"> {item.ans} </h6>
          </div>
        ))}
      </div>
    </section>
  );
};

const data = [
  {
    que: "What if my item doesnt fit?",
    ans: "Return with 24 hours and you will receive a part money, part credit refund.",
  },
  {
    que: "When will I receive my item?",
    ans: "The item will be shipped soon.",
  },
  {
    que: "What if I receive damaged item?",
    ans: "Please contact us in that case.",
  },
];

export default CommonQuestions;
