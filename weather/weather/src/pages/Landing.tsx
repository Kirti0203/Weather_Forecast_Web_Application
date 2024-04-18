// import { ChangeEvent, useState } from "react";
// import { optionType } from "../types";
// import "../App.css";
// import { useNavigate } from "react-router-dom";

// interface LandingProps {
//     tableData: any[]; // Adjust the type according to the structure of your data
// }

// const Landing:React.FC<LandingProps> = ({tableData}): JSX.Element => {
//     const [term, setTerm] = useState<string>("");
    
//     const [options, setOptions] = useState<[]>([]);
//   const [weatherData, setWeatherData] = useState<[]>([]);
  
//   const navigate = useNavigate();

//   const getSearchOptions = (value: string) => {
//     fetch(
//       `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100`
//     )
//       .then((res) => res.json())
//       .then((data) => setOptions(data.results));
//   };

//   // console.log(options);
//   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.trim();
//     setTerm(value);

//     if (value === "") return;
//     getSearchOptions(value);
//   };

//   const onOptionSelect = (option: optionType) => {
//     fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${option.coordinates.lat}&lon=${option.coordinates.lon}&appid=${process.env.REACT_APP_API_KEY}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setWeatherData(data);
//         navigate("/weather", { state: { weatherData: data } });
//       });
//   };

  

//   return (
//     <main className="flex flex-col  justify-center items-center bg-gradient-to-br from-slate-400 via-slate-200 to-slate-50  w-full">
//       <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24  mt-10 h-full lg:h-[500px] bg-black bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg text-blue-400">
//         <h1 className="text-4xl font-thin">
//           Weather <span className="font-black">Forecast</span>
//         </h1>
//         <p className="text-sm mt-2">Search for place you want to</p>

//         <div className=" relative flex mt-10 md:mt-4">
//           <input
//             type="text"
//             onChange={handleSearchChange}
//             value={term}
//             className=" px-2 py-1 rounded-l-md border-2 border-white "
//           />

//           <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
//             {options.map((option: optionType, index: number) => {
//               if (option.name.toLowerCase().startsWith(term) && term !== "") {
//                 return (
//                   <li key={option.name + "-" + index}>
//                     <button
//                       className="text-left text-sm w-full hover:bg-blue-400 hover:text-gray-200 px-2 py-1 cursor-pointer"
//                       onClick={() => onOptionSelect(option)}
//                     >
//                       {option.name}
//                     </button>
//                   </li>
//                 );
//               }
//             })}
//           </ul>

//           <button className="rounded-r-md border-2 border-zinc-100 hover:border-blue-400 text-blue-400 px-2 py-1 cursor-pointer  ">
//             Submit
//           </button>
//         </div>
//       </section>
//       <section>
//         <div className="flex flex-col">
//           <div className="-m-1.5 overflow-x-auto">
//             <div className="p-1.5 min-w-full inline-block align-middle">
//               <div className="overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead>
//                     <tr>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
//                       >
//                         City Name
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
//                       >
//                         Country
//                       </th>
//                       <th
//                         scope="col"
//                         className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
//                       >
//                         Time Zone
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {tableData.map((option: optionType, index: number) => {
//                       if (option.name.toLowerCase().startsWith(term)) {
//                         return (
//                           <tr className="hover:bg-gray-100">
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                             
//                             <button onClick={() => onOptionSelect(option)}>

//                                  {option.name}
//                             </button>

                            
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                               {option.cou_name_en}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                               {option.timezone}
//                             </td>
//                           </tr>
//                         );
//                       }
//                     })}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Landing;









import { ChangeEvent, useState } from "react";
import { optionType } from "../types";
import "../App.css";
import { useNavigate } from "react-router-dom";

interface LandingProps {
    tableData: any[]; // Adjust the type according to the structure of your data
}

const Landing: React.FC<LandingProps> = ({ tableData }): JSX.Element => {
    const [term, setTerm] = useState<string>("");
    const [options, setOptions] = useState<optionType[]>([]);
    const [weatherData, setWeatherData] = useState<any[]>([]);
    const navigate = useNavigate();

    const getSearchOptions = (value: string) => {
        if (!value) {
            setOptions([]);
            return;
        }

        fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100`)
            .then((res) => res.json())
            .then((data) => setOptions(data.results.slice(0, 5))); // Limit to maximum 5 autocomplete options
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setTerm(value);
        getSearchOptions(value);
    };

    const onOptionSelect = (option: optionType) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${option.coordinates.lat}&lon=${option.coordinates.lon}&appid=${process.env.REACT_APP_API_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                setWeatherData(data);
                navigate("/weather", { state: { weatherData: data } });
            });
    };

    return (
        <main className="flex flex-col justify-center items-center bg-gradient-to-br from-slate-400 via-slate-200 to-slate-50 w-full p-4">
            <section className="max-w-screen-md w-full md:p-8 bg-black bg-opacity-20 backdrop-blur-lg rounded-lg text-blue-400 relative">
                <h1 className="text-4xl font-thin mb-4">
                    Weather <span className="font-black">Forecast</span>
                </h1>
                <div className="relative">
                    <input
                        type="text"
                        onChange={handleSearchChange}
                        value={term}
                        placeholder="Enter a city name..."
                        className="px-4 py-2 rounded-l-md border-2 border-white focus:outline-none focus:border-blue-400 w-full"
                    />
                    {options.length > 0 && (
                        <ul className="absolute top-full left-0 w-full bg-white shadow-md rounded-b-md z-10">
                            {options.map((option, index) => (
                                <li key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => onOptionSelect(option)}>
                                    {option.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    <button
                        onClick={() => getSearchOptions(term)}
                        className="absolute top-0 right-0 bg-blue-400 text-white px-4 py-2 rounded-r-md hover:bg-blue-500 focus:outline-none"
                    >
                        Search
                    </button>
                </div>
                <div className="mt-60 overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Zone</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tableData.map((option: optionType, index: number) => {
                                if (option.name.toLowerCase().startsWith(term)) {
                                    return (
                                        <tr key={index} className="hover:bg-gray-100 cursor-pointer" onClick={() => onOptionSelect(option)}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{option.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{option.cou_name_en}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{option.timezone}</td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
};

export default Landing;
