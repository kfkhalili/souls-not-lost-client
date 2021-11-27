class ImageTransform {
    constructor() {
        this.height = 0;
        this.width = 0;
        this.x = 0;
        this.y = 0;
        this.column = 0;
    }
}

function sortImages(containerWidth, imagesDims, columnsCount) {
    let newImagesPos = []
    const cardWidth = containerWidth / columnsCount;
    for (let imgIndex = 0; imgIndex < imagesDims.length; imgIndex++) {
        const card = new ImageTransform();
        card.column = imgIndex % columnsCount;
        const image = imagesDims[imgIndex];

        // 1. scale the images to fit the whole container width
        card.height = Math.floor((image.height * cardWidth) / image.width);
        card.width = cardWidth;

        // 2. move images to horizontally
        card.x = Math.floor(card.column * cardWidth);

        // 3. move images to y vertically
        const heightOffset = newImagesPos.filter(x => x.column == card.column).map(x => x.height);
        if (heightOffset.length > 0) {
            card.y = Math.floor(heightOffset.reduce((x, total) => x + total));
        }

        newImagesPos.push(card)
    }

    return newImagesPos;
}

function sortImagesDom() {
    const images = $(".grid-item  img");
    const imagesContainers = $(".grid-item");
    const gridContainer = $(".gridCentered")[0];
    const allLoaded = images.map(function () {
        return this.complete && this.naturalHeight !== 0
    });
    if (allLoaded.toArray().filter(x => !x).length > 0) {
        gridContainer.style.height = `${images.length * 200}px`;
        console.log("images not loaded yet");
        return;
    }
    const imagesDims = images.map(function () {
        return {width: this.naturalWidth, height: this.naturalHeight};
    }).get()
    const newDimensions = sortImages(gridContainer.offsetWidth, imagesDims, 3);
    if (newDimensions.length > 0) {
        const totalHeight = newDimensions.map(x => x.height).reduce((x, total) => total + x);
        if (isNaN(totalHeight)) {
            gridContainer.style.height = `${newDimensions.map(x => 200).reduce((x, total) => total + x)}px`;
            console.log("bad request");
            return;
        }else{
            gridContainer.style.height = `${totalHeight}px`;
        }
    }

    for (let i = 0; i < imagesContainers.length; i++) {
        let img = imagesContainers[i];
        let dim = newDimensions[i];
        img.style.width = `${dim.width}px`;
        img.style.height = `${dim.height}px`;
        img.style.transform = `translate(${dim.x}px, ${dim.y}px)`;
    }

}

window.sortImagesDom = sortImagesDom
