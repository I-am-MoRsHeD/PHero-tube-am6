

const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();
    const category = data.data;
    // console.log(category)

    displayData(category)
    // handleNavbar(category)
}




const displayData = (data) => {

    const tabContainer = document.getElementById('tab-container')

    data.forEach(n => {
        // console.log(n)

        const div = document.createElement('div')
        div.innerHTML = `
        <a onclick="handleTab(${n.category_id})" class="tab tab-xs lg:w-full "><button class="btn bg-red-500">${n.category}</button></a> 
        `;
        tabContainer.appendChild(div)
    })
}


const handleTab = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    const category = data.data;


    NoContent(category)
    showCategoryDetails(category)
    // btnSort(category)
}



const showCategoryDetails = (data) => {
    const catergoryContainer = document.getElementById('category-container')
    catergoryContainer.innerText = '';
    const iconImage = document.getElementById('icon-image')
    data.forEach(n =>{
        
        console.log(n)
        const div = document.createElement('div')
        div.classList = `card card-compact w-76 bg-base-100 shadow-xl`
        div.innerHTML = `
            <div class="relative">
                <figure><img src="${n.thumbnail}" alt="Shoes"/></figure>
            </div>
            <div class="py-4 pl-4 flex gap-5">
                <div> 
                    <img class="w-10 rounded-full" src="${n.authors[0].profile_picture}"/>
                </div>
                <div> 
                    <h2 class="card-title">${n.title}</h2>
                    <div class="flex gap-2">
                        <p> <span>${n.authors[0].profile_name}</span></p>
                        <p> ${n.authors[0]?.verified?"<img class='w-5 mt-1' src='./images/verified-icon.png'/>":''} </p>
                    </div>
                    <p>${n.others.views} views</p>
                </div>
            </div>
        `;
        catergoryContainer.appendChild(div)
       
        showTime(n)
    })
    
   
}


// No content image
const NoContent = (data) =>{
    const iconImage = document.getElementById('icon-image')
    if(data.length === 0){
        iconImage.classList.remove('hidden')
    }
    else{
        iconImage.classList.add('hidden')
    }
}




// for showing hours and minutes
const showTime = (hrs) =>{
    const second = hrs.others.posted_date;
    const secondsToNumber = parseFloat(second)

    const hours = Math.floor(secondsToNumber / 3600)
    const minutes = Math.floor((secondsToNumber - (hours * 3600)) / 60);

    return (`<div>
    <p class="bg-black text-white"> ${`${hours}hrs ${minutes}min`}</p>
    </div>`)

    // console.log(hours + 'hrs' + ' ' + minutes + ' ' + 'min' + ' ' + 'ago')
}



// sort by views button access
const btnSort = (card) =>{

    
}




loadData()
handleTab(1000)



