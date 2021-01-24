<template>
    <footer class="footer navbar-fixed-bottom">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="footer-wrap">
                        <div class="author-git">
                            <span class="footer-title">GitHub Account:</span> <a href="https://github.com/airkross" target="_blank" class="footer-description">https://github.com/airkross</a> 
                        </div>
                        <div class="author-name">
                            <span class="footer-title">Author:</span> <span class="footer-description"> Гусейнов Руслан Рустамович </span>
                        </div>
                        <div class="author-photo">
                            <img src="https://airkross.github.io/portfoliofl/img/2.jpg" alt="Фото автора">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.footer{
    padding-top: 15px;
    padding-bottom: 15px;
    background: rgb(223, 223, 223);
    &-wrap{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &-title{
        font-weight: 700;
    }
    .author{
        &-git{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 10px;
        }
        &-name{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 10px;
        }
        &-photo{
            height: 100px;
            max-width: 100px;
            width: 100%;
            img{
                border-radius: 50%;
                width: 100%;
            }
        }
    }
}

@media screen and (min-width: 768px) {
    .footer{
        &-wrap{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .author{
            &-git{
                margin-bottom: unset;
            }
            &-name{
                margin-bottom: unset;
            }
        }
    }
}
</style>