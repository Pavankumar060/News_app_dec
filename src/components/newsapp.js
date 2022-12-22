import  {useEffect, useState} from "react";
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const CATEGORIES =[
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology"
]

const NewsApp =() =>{
    const [articles,setArticles] = useState([]);
    const [categorySelect, setCategorySelect] = useState("general");
    const [totalRecords,setTotalRecords] =useState(0);
    const [pageNum,setPageNum] = useState(1);
    const [loadingNews,setLoadingNews] = useState(false);
    const [loadPage,setLoadPage] = useState(false);

    const loadNews =() => {
        axios({
            method: 'GET',
            url:"https://newsapi.org/v2/top-headlines",
            params:{
                country:"in",
                apiKey:"7906762b29734848af64fe9ddb9aeb0b",
                category:categorySelect,
                pageSize: 8,
                page: pageNum
            }

        }).then((response) =>{
            setLoadingNews(false);
            setLoadPage(false);
            setArticles(response.data.articles);
            setTotalRecords(response.data.totalResults);
        }).catch((err) =>{
            // console.log(err,"err");
        })
    }
        //mounting
    useEffect(() =>{
          loadNews()  //api call
    },[])
        //updating 
    useEffect(() =>{
        
        loadNews()  //api call
  },[categorySelect,pageNum])


    const handleCategorySelection= (category) =>{
            // console.log("clicked on",category);
            setLoadingNews(true)
            setCategorySelect(category)
            setPageNum(1)
    }
   

    return(
        <>
        <h1 className="heading">NEWS App</h1>
        {
            CATEGORIES.map((category,index)=>{
                // console.log(category,"called");
                return(
                    <button key={index} style={{margin: 5}} className="btn btn-info"
                    onClick={() =>{ handleCategorySelection(category)}}
                    >{category}</button>
                )
            })
        }
        <br/>
        <br/>
        <br/>
        <br/>
       {
        loadingNews ? (<div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>) : (

<div  style={{display: "flex", flexWrap :"wrap",textAlign:"center",justifyContent:"center", padding: 5}}>
{
    articles.map((article,index) =>{
        return(
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        {
            loadPage ? (<div class="spinner-border text-success" role="status">
  <span class="sr-only"></span>
</div>) :(
        
            <div key={index+100}className="card" style={{width: 300, padding: 8, margin:12, backgroundColor:"#98FCFD"}}>
            <img src={article.urlToImage} className="card-img-top" style={{height:200}} alt="..."/>
            <div className="card-body" style={{color:"#7DCC0B" }} >
              <h6 key={index} className="card-title">{article.title}</h6>
              <p className="card-text" style={{height:120, overflow:"auto"}}>{article.description}</p>
              <a href={article.url} target="_blank" className="btn btn-primary">OK</a>
            </div>
          </div>
            )
    }
            </>
        )
    })
    
}
<br/>
<br/>
<ReactPaginate 
previousLabel="Previous"
nextLabel="Next"
pageClassName="page-item"
pageLinkClassName="page-link"
previousClassName="page-item"
previousLinkClassName="page-link"
nextClassName="page-item"
nextLinkClassName="page-link"
breakLabel="..."
breakClassName="page-item"
containerClassName="pagination"
activeClassName="active"
breakLinkClassName="page-link"
pageCount={Math.ceil(totalRecords/8)}

onPageChange={(event) =>{
    setPageNum(event.selected + 1);
    setLoadPage(true);
}}

/>
          

</div>
       )
       }
        
        
        </>
    )
}

export default NewsApp;