import React, {
  useState,
  useRef,
  useTransition,
  useEffect,
} from "react";
import axios from "axios";
import styled from "styled-components";
import ResetSearch from "../Button/ResetSearch";
import useDebounce from "../../../Hooks/useDebounce";
import ResultSearch from "./resultSearch";

const SearchNav = () => {
  const [visible, setVisible] = useState(false);
  const [valueSearch, setValueSearch] = useState();
  const [isPending, startTransition] = useTransition();
  const [searchResult, setSearchResult] = useState();
  const inputRef = useRef();
  const debounced = useDebounce(valueSearch, 1000);

  const handleSearch = (e) => {
    const result = e.target.value;
    const fixedInput = result.toLowerCase().trim();
    setValueSearch(fixedInput);
  };

  const handleClearSearch = () => {
    inputRef.current.value = "";
    setValueSearch("");
    setSearchResult([]);
    setVisible(false);
    inputRef.current.focus();
  };

  useEffect(() => {
    if (!valueSearch) return setVisible(false);
    if (!debounced) {
      setSearchResult([]);
      return;
    }
    startTransition(async () => {
      await axios
        .get(
          `http://localhost:5506/users/search?userName=${encodeURIComponent(
            debounced
          )}`
        )
        .then((data) => {
          setSearchResult(data.data);
          setVisible(true);
        });
    });
  }, [debounced]);

  return (
    <Search>
      <FormSearch>
        <InputSearch
          type="text"
          ref={inputRef}
          placeholder="Search accounts and videos"
          onChange={handleSearch}
        />
        {visible ? (
          <ResultSearch searchResult={searchResult} isPending={isPending} />
        ) : null}
        {valueSearch ? (
          <ResetSearch handleClearSearch={handleClearSearch} />
        ) : null}
        <SpanSearch></SpanSearch>
        <ButtonSubmit type="submit">
          <svg
            width="24"
            height="24"
            viewBox="0 0 48 48"
            fill="rgba(22, 24, 35, 0.34)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"
            ></path>
          </svg>
        </ButtonSubmit>
      </FormSearch>
    </Search>
  );
};
const Search = styled.div`
  position: relative;
  @media only screen and (max-width: 800px) {
    display: none;
  }
`;
const FormSearch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background: rgba(22, 24, 35, 0.06);
  border-radius: 92px;
  position: relative;
  z-index: 1;
  margin: 0;
`;
const InputSearch = styled.input`
  font-family: ProximaNova, Arial, Tahoma, PingFangSC, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  border: none;
  background: transparent;
  outline: none;
  padding: 0;
  width: 292px;
  caret-color: rgba(254, 44, 85, 1);
  appearance: textfield;
`;
const ButtonSubmit = styled.button`
  padding: 11px 16px 11px 12px;
  margin: -12px -16px;
  font-size: 0;
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  margin-left: 0;
  &:hover {
    background: rgba(22, 24, 35, 0.03);
  }
`;
const SpanSearch = styled.span`
  width: 1px;
  height: 28px;
  margin: -3px 0;
  background: rgba(22, 24, 35, 0.12);
`;

export default SearchNav;
