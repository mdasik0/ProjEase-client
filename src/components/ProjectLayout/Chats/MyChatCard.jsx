import { LuReplyAll } from 'react-icons/lu';

const MyChatCard = () => {
    return (
         <div className="flex flex-row-reverse">
              <div className="chat-card-container block max-w-[50%] min-w-[10%]">
                <div className="w-fit">
                  
        
                  <div className="message-actions-container relative">
                    
                    <p className="message text-[15px] bg-blue-400 text-white  p-2 px-3.5 rounded-xl rounded-br-none mt-2">
                      Lorem ipsum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni cumque enim ipsum doloribus amet earum fugiat nesciunt iure ex, est porro sed atque architecto eaque ab dignissimos alias eligendi commodi. Aut unde aspernatur temporibus ab eaque at velit! Ducimus modi rem et obcaecati, accusantium ea? Ipsum accusamus cumque eligendi laboriosam culpa vitae animi iusto, fugit ipsa? Laborum itaque ut quia adipisci deserunt sequi harum veritatis, distinctio accusantium ducimus atque doloribus fugiat. Commodi vitae sit vero sunt quae aperiam, iste, odio provident voluptatem porro dolore quaerat nam id, asperiores eaque itaque rem excepturi iure repellat! Perspiciatis quae tenetur iste ipsam quis? Aliquam laboriosam, nemo cupiditate maiores consectetur tempora, rerum porro temporibus iure impedit recusandae repellat odit corporis quia ducimus facere dolore in perspiciatis eaque molestias possimus ut incidunt dolorum. Praesentium placeat in fugiat, excepturi harum sed aliquid nam enim, quasi expedita veritatis magni nisi odit dolore magnam minima. Assumenda doloribus molestias voluptatibus voluptate hic est dolor, maxime totam iste, vero distinctio. Consectetur voluptas reiciendis, reprehenderit asperiores aspernatur provident sapiente sed laborum ducimus placeat velit nemo temporibus fuga at molestiae optio officiis quisquam doloribus cupiditate suscipit expedita vero. Quas voluptatum rem quaerat eius, exercitationem libero obcaecati, fuga placeat sed qui nihil numquam?
                    </p>
                    <div className="replyandActions">
                      <button
                        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 duration-300 tooltip absolute top-[50%] -translate-y-[50%] -left-[40px]"
                        data-tip="reply"
                      >
                        <LuReplyAll />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
    );
};

export default MyChatCard;