'use strict'

const li        = document.querySelectorAll('.li')
const bloque    = document.querySelectorAll('.bloque')


li.forEach( ( cadaLi , i )=>{
    li[i].addEventListener('click',()=>{

        li.forEach( ( cadaLi , i )=>{
            li[i].classList.remove('activo')
            bloque[i].classList.remove('activo')
        })
        li[i].classList.add('activo')
        bloque[i].classList.add('activo')

    })
})


const li2        = document.querySelectorAll('.li2')
const bloque2    = document.querySelectorAll('.bloque2')


li2.forEach( ( cadaLi , i )=>{
    li2[i].addEventListener('click',()=>{

        li2.forEach( ( cadaLi , i )=>{
            li2[i].classList.remove('activo')
            bloque2[i].classList.remove('activo')
        })
        li2[i].classList.add('activo')
        bloque2[i].classList.add('activo')

    })
})