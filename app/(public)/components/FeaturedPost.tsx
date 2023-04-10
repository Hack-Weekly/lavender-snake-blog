import { Inter } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { BsFillArrowRightCircleFill } from "react-icons/bs"
import { BiTimeFive } from "react-icons/bi"

interface Post {
    id: string
	title: string
	body: string
	tags: string[]
	author: string
	imgsrc: string
	datetime: number
}

const inter = Inter({
    subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
})

const mockData = {
    id: "1",
	title: "The Science of Geometry",
	body: `Geometry is a branch of mathematics that deals with the study of shapes, sizes, positions, and dimensions of objects in space. It is a fundamental field of study that has been in existence for thousands of years, dating back to ancient civilizations such as the Greeks, Egyptians, and Babylonians. The science of geometry has played a significant role in the development of various branches of science and engineering, including architecture, physics, and computer graphics. In this article, we will delve deeper into the fascinating world of geometry, exploring its history, concepts, and practical applications in modern-day society.

	History of Geometry
	
	Geometry can be traced back to ancient Egypt, where it was used to survey and measure the land for the construction of the pyramids. The Egyptians were the first to use the concept of right angles, and they developed a system of measurement based on the length of the forearm, called the cubit. The Egyptians also used geometry to solve practical problems, such as calculating the area of fields and the volume of containers.
	
	The ancient Greeks are credited with the development of Euclidean geometry, which is the study of points, lines, angles, surfaces, and solids in space. Euclid, a Greek mathematician, wrote a book called "Elements," which is considered the most influential textbook in the history of mathematics. The book contains 13 volumes and contains the basic principles of geometry, including axioms, postulates, and theorems. The Elements remained the standard textbook on geometry for over 2000 years.
	
	In the Islamic Golden Age, Persian mathematician Al-Khwarizmi wrote a book called "The Compendious Book on Calculation by Completion and Balancing," which was a major contribution to the field of algebra and geometry. In the 17th century, French mathematician René Descartes developed analytic geometry, which is the study of geometry using algebraic equations. This allowed mathematicians to describe geometric shapes using equations, making it easier to solve geometric problems.
	
	Geometry Concepts
	
	Geometry is a vast field that includes many concepts and principles. Here are some of the fundamental concepts of geometry:
	
	Points: A point is a location in space that has no size or dimension. It is represented by a dot.
	Lines: A line is a straight path that extends indefinitely in both directions. It is represented by a straight line with arrows on both ends.
	Line segments: A line segment is a part of a line that has two endpoints.
	Angles: An angle is formed by two rays that have a common endpoint. It is measured in degrees, with a full circle equal to 360 degrees.
	Polygons: A polygon is a closed shape with straight sides. Examples include triangles, quadrilaterals, and pentagons.
	Circles: A circle is a closed shape with all points equidistant from a center point. It is defined by its radius, which is the distance from the center point to any point on the circle.
	
	Practical Applications of Geometry
	
	Geometry has practical applications in many fields of science and engineering. Here are some examples of how geometry is used in real-world situations:
	
	Architecture: Architects use geometry to design and construct buildings. They use principles of geometry to calculate angles, lengths, and areas of different parts of a building. They also use geometric shapes to create aesthetically pleasing designs.
	Art: Artists use geometry to create aesthetically pleasing designs. They use geometric shapes and patterns to create symmetry and balance in their art. Examples include the use of the golden ratio in paintings and sculptures.
	Computer graphics: Computer graphics use geometry to create realistic images and animations. Geometric shapes and formulas are used to create 3D models of objects and scenes.
	Engineering: Engineers use geometry to design and build structures such as bridges, tunnels, and roads. 
	
	In conclusion, geometry is a fascinating field of mathematics with a rich history and practical applications in many areas of science and engineering. From the ancient Egyptians to modern-day architects and engineers, geometry has been used to solve practical problems and create aesthetically pleasing designs. The concepts of points, lines, angles, and shapes are the building blocks of geometry, and they provide a framework for understanding the physical world around us. As technology continues to advance, the applications of geometry will continue to grow and evolve, and we can expect to see even more innovative and practical uses of this fundamental field of mathematics.`,
	tags: ["mathematics", "science"],
	author: "Jude",
	imgsrc: "/images/ArticleImage.png", //1024 x 1024
	datetime: Date.now(),
} as Post

export default function FeaturedPost() {
    const tags = mockData.tags.map((item) => item.toUpperCase()).join(", ");
    const datetime = new Date(mockData.datetime).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric' });

	return (
		<div className={`flex flex-col sm:flex-row items-center w-[90%] sm:w-[85%] md:w-[85%] lg:w-[75%] xl:w-[70%] mt-10 p-6 lg:p-10 bg-secondary-bg hover:drop-shadow-2xl dark:bg-[#1F2937] dark:hover:bg-[#293548] rounded-lg ${inter.variable} font-inter cursor-pointer`} >
            <Image
                className="h-48 sm:h-60 w-auto sm:w-5/12 mb-4 sm:mb-0 rounded-md"
                src={mockData.imgsrc}
                alt="Featured Image"
                width={384}
                height={240}
                priority
            />
            <div className="flex flex-col justify-center w-full ml-8 lg:ml-14 mr-8 sm:mr-4">
                <div className="text-sm text-primary-600 dark:text-primary-100">
                    {tags}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-title dark:text-title-dark my-2 line-clamp-2">
                    {mockData.title}
                </div>
                <div className="text-justify text-sm sm:text-base my-1 sm:my-2 dark:text-[#bdbddd] line-clamp-3">
                    {mockData.body}
                </div>
                <div className="flex justify-between mt-3 text-xs sm:text-sm font-semibold">
                    <div className="flex items-center gap-2 p-1 bg-primary-100 rounded-md dark:text-primary-800">
                        READ MORE <BsFillArrowRightCircleFill />
                    </div>
                    <div className="flex items-center gap-1 text-primary-600 dark:text-primary-100">
                        <BiTimeFive /> <span>{datetime}</span>
                    </div>
                </div>
            </div>
        </div>
	)
}