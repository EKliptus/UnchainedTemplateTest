const ListItem = (props) => {
  return (
    <div className="text-right">
      <div className="border-top py-3 mt-0">
        <div className="d-flex flex-wrap justify-content-between">
          <div className="font-weight-bolder">{props.title}</div>
          <div>{props.value}</div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
